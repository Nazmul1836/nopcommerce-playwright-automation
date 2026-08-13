const { test, expect } = require('@playwright/test');
const { CategoryPage } = require('../../pages/CategoryPage');
const { ProductPage } = require('../../pages/ProductPage');
const categories = require('../../test-data/category.json');
const products = require('../../test-data/products.json');
test.describe('Add to Cart', () => { 
    test('ADD-001: User can add a product to the cart', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const categoryName =categories.category.name;
        const productName = products.addToCartProduct.name;
        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption("1");
        await productPage.addToCart();
        await expect(page.getByText('The product has been added to your shopping cart')).toBeVisible();
        await productPage.goToShoppingCart();
        await expect(page.getByRole('link', { name: 'T-shirt', exact: true })).toBeVisible();
    }); 
    test('ADD-002: Add Multiple Products to the Cart', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
         const categoryName =categories.category.name;
        const productName = products.addToCartProduct.name;
        const secondProductName = products.secondCartProduct.name;
        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption("1");
        await productPage.addToCart();
        await productPage.goToHomePage();
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(secondProductName);
        await productPage.addToCart();
        await productPage.goToShoppingCart();
        await expect(page.getByRole('link', { name: 'T-shirt', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Havana Hat', exact: true })).toBeVisible();

        
    });          
});