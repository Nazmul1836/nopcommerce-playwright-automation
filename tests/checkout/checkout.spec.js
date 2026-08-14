const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const{LoginPage} = require('../../pages/LoginPage');
const { CategoryPage } = require('../../pages/CategoryPage');
const{CartPage} = require('../../pages/CartPage'); 
const users = require('../../test-data/users.json');
const categories = require('../../test-data/category.json');
const products = require('../../test-data/products.json');
const { ProductPage } = require('../../pages/ProductPage');

test.describe.serial('Checkout Functionality', () => {
    test('CHECKOUT-001: User can complete the checkout process', async ({ page }) => {
        
        const checkoutPage = new CheckoutPage(page);
        const loginPage = new LoginPage(page);
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const categoryName = categories.category.name;
        const productName = products.addToCartProduct.name;

        await page.goto('/');
        await loginPage.openLoginPage();
        await loginPage.login(
            users.admin.email,
            users.admin.password
        );
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption("1");
        await productPage.addToCart();
        await productPage.goToShoppingCart();
        await checkoutPage.checkout();
        await checkoutPage.continueThroughCheckout();
        await checkoutPage.confirmOrder();
        await expect(page.getByText(/Your order has been/i)).toBeVisible({ timeout: 20000 });
    });
    test('CHECKOUT-002: Terms checkbox is available and unchecked by default', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const categoryName = categories.category.name;
        const productName = products.addToCartProduct.name;

        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption('1');
        await productPage.addToCart();
        await productPage.goToShoppingCart();

        await expect(checkoutPage.termsCheckbox).toBeVisible();
        await expect(checkoutPage.termsCheckbox).not.toBeChecked();
    });
});