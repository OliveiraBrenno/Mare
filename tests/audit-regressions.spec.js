import { test, expect } from "@playwright/test";

test("motion follows system preference without a pause button or legacy stored pause", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("mare-motion-paused", "true"),
  );
  await page.goto("/");
  await expect(page.locator("#motion-toggle")).toHaveCount(0);
  await page.locator("#historia").scrollIntoViewIfNeeded();
  const moving = await page.locator(".wave-front").getAttribute("d");
  await page.waitForTimeout(300);
  expect(await page.locator(".wave-front").getAttribute("d")).not.toBe(moving);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const stopped = await page.locator(".wave-front").getAttribute("d");
  await page.waitForTimeout(300);
  expect(await page.locator(".wave-front").getAttribute("d")).toBe(stopped);
  await expect(page.locator(".ocean-content")).toHaveCSS("opacity", "1");
});

test("breakpoint edges and enlarged text keep all content inside the viewport", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [
    320, 390, 600, 601, 620, 767, 768, 850, 1024, 1100, 1101, 1440,
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `overflow at ${width}`,
    ).toBeLessThanOrEqual(width);
    const cta = await page.locator(".header .outline-button").boundingBox();
    expect(cta.x + cta.width).toBeLessThanOrEqual(width);
  }
  for (const width of [320, 390, 601]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      const pairs = [...document.querySelectorAll("body *")].map((el) => [
        el,
        parseFloat(getComputedStyle(el).fontSize),
      ]);
      pairs.forEach(([el, size]) => (el.style.fontSize = `${size * 2}px`));
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `text 200% at ${width}`,
    ).toBeLessThanOrEqual(width);
    const fits = await page.evaluate(
      () =>
        document.querySelector(".hero-content").getBoundingClientRect()
          .bottom <=
        document.querySelector(".hero").getBoundingClientRect().bottom,
    );
    expect(fits, `hero text fits at ${width}`).toBeTruthy();
    if (width === 390)
      await page.screenshot({
        path: ".impeccable/review/fixed-text200.png",
        fullPage: true,
      });
  }
});

test("navigation touch targets reach 44px and fonts are served locally", async ({
  page,
}) => {
  const external = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:5173"))
      external.push(request.url());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [
    "footer nav a",
    ".back-top",
    ".header .outline-button",
    ".journey-link",
  ]) {
    const boxes = await page.locator(selector).evaluateAll((elements) =>
      elements.map((el) => ({
        w: el.getBoundingClientRect().width,
        h: el.getBoundingClientRect().height,
      })),
    );
    for (const box of boxes) {
      expect(box.h).toBeGreaterThanOrEqual(44);
      expect(box.w).toBeGreaterThanOrEqual(44);
    }
  }
  expect(external).toEqual([]);
  expect(await page.locator(".hero-image").getAttribute("fetchpriority")).toBe(
    "high",
  );
  await expect(page.locator(".terrace-image")).toHaveAttribute(
    "loading",
    "lazy",
  );
  expect(
    await page.locator(".dish-window img").first().getAttribute("srcset"),
  ).toContain("400w");
});

test("offscreen idle scenes do not continually recalculate styles", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const session = await page.context().newCDPSession(page);
  await session.send("Performance.enable");
  const before = await session.send("Performance.getMetrics");
  await page.waitForTimeout(1100);
  const after = await session.send("Performance.getMetrics");
  const delta =
    after.metrics.find((m) => m.name === "RecalcStyleCount").value -
    before.metrics.find((m) => m.name === "RecalcStyleCount").value;
  expect(delta).toBeLessThan(10);
});
