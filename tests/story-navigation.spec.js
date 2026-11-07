import { test, expect } from '@playwright/test';

for (const reducedMotion of ['reduce', 'no-preference']) {
  test(`ocean indicator stays in its scene and follows its scroll (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    for (const [width, height] of [[1440,600], [1440,900], [1440,1200], [768,900]]) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await expect(page.locator('.ocean .story-progress')).toHaveCount(1);
      expect(await page.locator('.story-progress').evaluate(el => getComputedStyle(el).position)).toBe('relative');
      for (const index of [0,1,2,3,2,1,0]) {
        await page.evaluate((index) => {
          const section = document.querySelector('.ocean');
          // Read the middle of each quarter of the scene, down and back up.
          const progress = (index + 0.5) / 4;
          const targetTop = innerHeight * 0.5 - progress * section.offsetHeight;
          scrollTo({ top:section.offsetTop - targetTop, behavior:'instant' });
        }, index);
        const active = page.locator('.story-progress [aria-current="step"]');
        await expect(active).toHaveText(['As pessoas','O mar','A cozinha','O sabor'][index]);
        await expect(active).toBeInViewport();
      }
      await page.locator('#cardapio').scrollIntoViewIfNeeded();
      expect(await page.locator('.story-progress').evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThan(0);
    }
  });
}

for (const width of [320, 390, 600]) {
  test(`mobile ${width}px shows the scene indicator and preserves page scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await page.locator('.story-progress').scrollIntoViewIfNeeded();
    await expect(page.locator('.story-progress')).toBeVisible();
    await expect(page.locator('.story-progress span')).toHaveText(['As pessoas', 'O mar', 'A cozinha', 'O sabor']);
    for (const index of [0, 1, 2, 3, 2, 1, 0]) {
      await page.evaluate(index => {
        const indicator = document.querySelector('.story-progress');
        const rect = indicator.getBoundingClientRect();
        const progress = (index + 0.5) / 4;
        const targetTop = (innerHeight - rect.height) * (1 - progress);
        scrollTo({ top: scrollY + rect.top - targetTop, behavior: 'instant' });
      }, index);
      const active = page.locator('.story-progress [aria-current="step"]');
      await expect(active).toHaveText(['As pessoas', 'O mar', 'A cozinha', 'O sabor'][index]);
      await expect(active).toBeInViewport();
    }
    await page.locator('#cardapio').scrollIntoViewIfNeeded();
    await expect(page.locator('#cardapio')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.story-progress')).toBeVisible();
  });
}
