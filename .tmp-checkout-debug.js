const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://localhost:59579/');
  await page.goto('https://localhost:59579/login?returnUrl=%2F');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourStore.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1500);
  await page.goto('https://localhost:59579/clothes');
  await page.getByRole('link', { name: 'T-shirt', exact: true }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: /shopping cart/i }).click();
  await page.getByRole('checkbox', { name: 'I agree with the terms of' }).check();
  await page.getByRole('button', { name: 'Checkout' }).click();

  for (let i = 0; i < 8; i++) {
    await page.waitForTimeout(1200);
    const payload = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      buttons: [...document.querySelectorAll('button')].map(el => ({
        text: (el.textContent || '').trim(),
        disabled: !!el.disabled,
        onclick: el.getAttribute('onclick') || '',
        className: el.className || '',
        visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
      })),
      radios: [...document.querySelectorAll('input[type="radio"]')].map(el => ({
        name: el.name,
        value: el.value,
        checked: el.checked,
        disabled: !!el.disabled,
        visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
      })),
      selects: [...document.querySelectorAll('select')].map(el => ({
        name: el.name,
        id: el.id,
        value: el.value,
        disabled: !!el.disabled,
        visible: !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
      })),
      text: document.body.innerText.slice(0, 2500)
    }));
    console.log('=== STEP ' + i + ' ' + payload.url);
    console.log(JSON.stringify(payload, null, 2));

    const enabledContinue = page.locator('button:has-text("Continue")').filter({ hasNot: page.locator('[disabled]') });
    const continueCount = await enabledContinue.count();
    const confirmCount = await page.locator('button:has-text("Confirm")').count();
    if (confirmCount > 0) {
      console.log('FOUND CONFIRM');
      break;
    }
    if (continueCount === 0) {
      console.log('NO ENABLED CONTINUE');
      break;
    }
    await enabledContinue.first().click();
  }

  await browser.close();
})();
