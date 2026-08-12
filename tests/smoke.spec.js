const { test, expect } = require('@playwright/test');

test('Verify application is reachable', async ({ page }) => {
    await page.goto('/');

    console.log('Page title:', await page.title());
    console.log('Current URL:', page.url());

  await expect(page).toHaveURL(/localhost:59579/);
    await expect(page).toHaveTitle('-My Store');
});