import {test,expect} from '@playwright/test';
test('opening keeps the journey link safely inside short and tall desktop windows',async({page})=>{
  for(const [width,height] of [[1996,1058],[1440,760],[1280,680],[1140,604],[1024,600],[390,844]]){
    await page.setViewportSize({width,height});await page.goto('/');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
    const geometry=await page.evaluate(()=>{
      const hero=document.querySelector('.hero').getBoundingClientRect();const link=document.querySelector('.journey-link').getBoundingClientRect();const ocean=document.querySelector('.ocean').getBoundingClientRect();
      return{heroBottom:hero.bottom,linkBottom:link.bottom,oceanTop:ocean.top,clipping:getComputedStyle(document.querySelector('.ocean')).overflow,sideBackground:getComputedStyle(document.querySelector('.story-progress')).backgroundColor};
    });
    expect(geometry.heroBottom-geometry.linkBottom,`CTA spacing at ${width}x${height}`).toBeGreaterThanOrEqual(48);
    expect(geometry.oceanTop).toBeGreaterThanOrEqual(geometry.heroBottom-1);
    expect(geometry.clipping).toBe('hidden');
    expect(geometry.sideBackground).toBe('rgba(0, 0, 0, 0)');
    if(width>=1024)expect(geometry.linkBottom).toBeLessThan(height-40);
    if(width===1140||width===1440){await page.screenshot({path:`.impeccable/review/opening-${width}.png`});await page.locator('#historia').scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:`.impeccable/review/ocean-${width}.png`});}
  }
});
