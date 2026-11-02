import { test, expect } from "@playwright/test";
test("home keeps a reduced selection and opens the full menu", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".menu-item")).toHaveCount(4);
  await page.getByRole("link", { name: "Ver cardápio completo" }).click();
  await expect(page).toHaveURL(/\/cardapio\//);
  await expect(page.locator(".catalog-dish")).toHaveCount(35);
  await expect(page.locator(".catalog-category")).toHaveCount(7);
});
test("menu combines categories, accent-insensitive ingredient search and empty recovery", async ({
  page,
}) => {
  await page.goto("/cardapio/");
  await page.getByRole("button", { name: "Bebidas" }).click();
  await expect(page.locator(".catalog-dish:visible")).toHaveCount(8);
  await page.getByLabel("Encontre seu próximo sabor").fill("LIMAO");
  await expect(page.locator(".catalog-dish:visible")).toHaveCount(2);
  await page.reload();
  await expect(page.getByLabel("Encontre seu próximo sabor")).toHaveValue(
    "LIMAO",
  );
  await expect(page.locator(".catalog-dish:visible")).toHaveCount(2);
  await page.getByLabel("Encontre seu próximo sabor").fill("inexistente");
  await expect(page.getByText("Nenhum sabor por aqui.")).toBeVisible();
  await page.getByRole("button", { name: "Ver todo o cardápio" }).click();
  await expect(page.locator(".catalog-dish:visible")).toHaveCount(35);
});
test("full menu adapts to phone and desktop, supports keyboard search and reserve link", async ({
  page,
}) => {
  for (const [name, width] of [
    ["desktop", 1440],
    ["mobile", 390],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/cardapio/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.getByLabel("Encontre seu próximo sabor").focus();
    await page.keyboard.type("polvo");
    await page.keyboard.press("Enter");
    await expect(page.locator(".catalog-dish:visible")).toHaveCount(1);
    await page.getByRole("button", { name: "Limpar", exact: true }).click();
    await expect(page.locator(".catalog-dish:visible")).toHaveCount(35);
    await page.screenshot({
      path: `.impeccable/review/catalog-${name}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("link", { name: "Simular uma reserva" }).click();
  await expect(page).toHaveURL(/\/#reserva$/);
});
