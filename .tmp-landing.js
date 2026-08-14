const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://localhost:59579/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('TITLE:', await page.title());
  console.log('URL:', page.url());
  console.log('BODY:', await page.locator('body').innerText());
  await browser.close();
})();
