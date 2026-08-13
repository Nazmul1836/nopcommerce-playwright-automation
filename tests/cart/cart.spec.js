const { test, expect } = require('@playwright/test');
const { CartPage } = require('../../pages/CartPage');
const {ProductPage} = require('../../pages/ProductPage');
const{ CategoryPage } = require('../../pages/CategoryPage');
const categories = require('../../test-data/category.json');
const products = require('../../test-data/products.json');
test.describe('Cart Functionality', () => {
    
    test('CART-001: User can increase the quantity of a product in the cart', async ({ page }) => {
        const categoryPage = new CategoryPage(page);    
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const categoryName = categories.category.name;
        const productName = products.secondCartProduct.name;
        await page.goto('/'); 
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.addToCart();
        await productPage.goToShoppingCart();
        await cartPage.increaseQuantity();
        await expect(
    page.getByRole('textbox', { name: 'Qty.' })
).toHaveValue('2');
    });
    test('CART-002: User can remove a product from the cart', async ({ page }) => {
        const categoryPage = new CategoryPage(page);    
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const categoryName = categories.category.name;
        const productName = products.secondCartProduct.name;
        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.addToCart();
        await productPage.goToShoppingCart();
        await cartPage.removeProduct();
        await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
    }) 
})     