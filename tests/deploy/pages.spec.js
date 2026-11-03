import {test,expect} from '@playwright/test';
test('production pages retain assets and navigation under repository subpath',async({page})=>{
 const failures=[];page.on('response',response=>{if(response.status()>=400)failures.push(response.url());});
 await page.goto('./');await page.evaluate(()=>document.fonts.ready);await expect(page.locator('.hero-image')).toBeVisible();
 expect(await page.locator('.hero-image').evaluate(image=>image.complete&&image.naturalWidth>0)).toBeTruthy();
 await page.getByRole('link',{name:'Ver cardápio completo'}).click();await expect(page).toHaveURL(/\/Mare\/cardapio\//);
 await page.getByLabel('Encontre seu próximo sabor').fill('polvo');await expect(page.locator('.catalog-dish:visible')).toHaveCount(1);
 await page.getByRole('link',{name:'Simular uma reserva'}).click();await expect(page).toHaveURL(/\/Mare\/#reserva$/);
 await page.getByRole('button',{name:'Fazer reserva'}).click();await expect(page.getByLabel('Seu nome')).toBeFocused();
 expect(failures).toEqual([]);
});
