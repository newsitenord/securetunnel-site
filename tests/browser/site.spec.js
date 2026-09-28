import {test,expect} from '@playwright/test';
const newGuide='/learn/vpn-vs-private-browsing';
test('new article is readable, cited, and free of runtime errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(newGuide);expect(response.status()).toBe(200);
 await expect(page.locator('h1')).toHaveText('VPN vs private browsing: which privacy problem?');
 await expect(page.locator('[data-article-body] section')).toHaveCount(8);
 await expect(page.locator('#sources li')).toHaveCount(3);
 await page.getByRole('link',{name:'What a private window actually changes',exact:true}).click();
 await expect(page).toHaveURL(/#what-a-private-window-actually-changes$/);
 expect(errors).toEqual([]);
});
test('mobile library and article do not overflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});
 for(const path of ['/learn',newGuide,'/reviews/nordvpn','/']){
  await page.goto(path);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),path).toBe(true);
 }
});
test('library links reach real guides',async({page})=>{
 await page.goto('/learn');
 await page.getByRole('link',{name:/VPN and captive portals: connect to hotel Wi-Fi/}).click();
 await expect(page.locator('h1')).toContainText('captive portals');
});
test('affiliate link uses supplied URL, attributes, and nearby disclosure',async({page})=>{
 await page.goto('/learn/vpn-vs-proxy');
 const link=page.getByRole('link',{name:'Check NordVPN’s current terms'});
 await expect(link).toHaveAttribute('href','https://nordvpn.sjv.io/Dym2Wa');
 await expect(link).toHaveAttribute('rel',/sponsored/);
 await expect(page.locator('.cta')).toContainText('we may earn a commission');
 await expect(page.locator('footer')).toContainText('Affiliate disclosure');
});
test('unpublished URL and unknown sitemap return real 404s',async({request})=>{
 for(const path of ['/learn/unpublished-guide','/watch/fictional-service/france','/sitemaps/999.xml'])expect((await request.get(path)).status(),path).toBe(404);
});
test('metadata is present without client rendering',async({request})=>{
 const response=await request.get(newGuide);const html=await response.text();
 expect(html).toContain('rel="canonical"');expect(html).toContain('application/ld+json');expect(html).toContain('A private window and a VPN solve different problems');
 expect((await request.get('/sitemap.xml')).headers()['content-type']).toContain('application/xml');
});
