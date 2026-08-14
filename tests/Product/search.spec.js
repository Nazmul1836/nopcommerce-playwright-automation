const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../../pages/SearchPage');
const products = require('../../test-data/products.json');
test.describe('products search',() =>{
test('SEARCH-001: User can search for a product', async ({ page }) => { 
const searchPage = new SearchPage(page);
const productName = products.existingProduct.name;
await page.goto('/');
await searchPage.searchProduct(productName);
    await expect(
            page.getByRole('link', {
                name: productName,
                exact: true
            })
        ).toBeVisible();
})
test('SEARCH-002: User cannot search for a non-existing product', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productName = products.nonExistingProduct.name;
    await page.goto('/');
    await searchPage.searchProduct(productName);
    await expect(
        page.getByText('No products were found that matched your criteria.')
    ).toBeVisible();
    
});
test('SEARCH-003: User can search for a product using partial name', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productName = products.partialProduct.name;
    const expectedProductName = products.partialProduct.expectedProduct.name;
    await page.goto('/');
    await searchPage.searchProduct(productName);
    await expect(
        page.getByRole('link', {
            name: expectedProductName,
            exact: true
        })
    ).toBeVisible();
});
test('SEARCH-004: User can open a product from search results', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productName = products.existingProduct.name;
    await page.goto('/');
    await searchPage.searchProduct(productName);
    await searchPage.openProduct(productName);
    await expect(page.getByRole('heading', { name: productName })).toBeVisible(); 
});  
});