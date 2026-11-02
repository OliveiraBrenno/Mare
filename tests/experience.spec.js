import { test, expect } from "@playwright/test";
test("scroll drives the ocean waves and scene movement", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator("#historia").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const first = await page.locator(".wave-front").getAttribute("d");
  await page.waitForTimeout(300);
  expect(await page.locator(".wave-front").getAttribute("d")).not.toBe(first);
  const transform = await page
    .locator(".underwater-image")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(300);
  expect(
    await page
      .locator(".underwater-image")
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(transform);
  await page.screenshot({ path: ".impeccable/review/ocean-motion.png" });
});
test("reservation is accessible, validated and explicitly simulated", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Fazer reserva" }).click();
  await expect(page.getByLabel("Seu nome")).toBeFocused();
  await page.getByLabel("Seu nome").fill("Brenno");
  await page.getByLabel("Data", { exact: true }).fill("2027-12-20");
  await page.getByLabel("Horário").selectOption("19:00");
  await page.getByLabel("Pessoas").selectOption("2 pessoas");
  await page.getByRole("button", { name: "Simular reserva" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Brenno, sua reserva simulada",
  );
  await expect(page.getByRole("status")).toContainText("Nenhuma reserva real");
});
test("desktop and phone render without overflow or missing images", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((img) => {
          img.loading = "eager";
          return img.decode().catch(() => {});
        }),
      );
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    expect(
      await page.evaluate(() =>
        [...document.images]
          .filter((img) => !img.naturalWidth)
          .map((img) => img.src),
      ),
    ).toEqual([]);
    await page.screenshot({
      path: `.impeccable/review/${name}.png`,
      fullPage: true,
    });
  }
});
