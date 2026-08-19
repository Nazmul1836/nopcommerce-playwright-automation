const { test, expect } = require('@playwright/test');
const { CategoryPage } = require('../../pages/CategoryPage');
const { ProductPage } = require('../../pages/ProductPage');
const { WishlistPage } = require('../../pages/WishlistPage');
const categories = require('../../test-data/category.json');
const products = require('../../test-data/products.json');

test.describe('Wishlist Functionality', () => {

    test('WISH-001: User can add a product to the wishlist', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const wishlistPage = new WishlistPage(page);
        
        const categoryName = categories.category.name;
        const productName = products.addToCartProduct.name;

        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption("1");
        await productPage.addToWishlist();

        await expect(page.getByText('The product has been added to your wishlist')).toBeVisible();

        await productPage.goToWishlist();
        const isInWishlist = await wishlistPage.isProductInWishlist(productName);
        expect(isInWishlist).toBeTruthy();
    });

    test('WISH-002: User can move a product from wishlist to shopping cart', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const wishlistPage = new WishlistPage(page);
        
        const categoryName = categories.category.name;
        const productName = products.secondCartProduct.name;

        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.addToWishlist();

        await productPage.goToWishlist();
        await wishlistPage.selectAddToCartForProduct(productName);
        await wishlistPage.clickAddToCart();

        await expect(page.getByRole('link', { name: productName, exact: true })).toBeVisible();
    });

    test('WISH-003: User can remove a product from the wishlist', async ({ page }) => {
        const categoryPage = new CategoryPage(page);
        const productPage = new ProductPage(page);
        const wishlistPage = new WishlistPage(page);
        
        const categoryName = categories.category.name;
        const productName = products.addToCartProduct.name;

        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await productPage.openProduct(productName);
        await productPage.selectProductColorOption("1");
        await productPage.addToWishlist();

        await productPage.goToWishlist();
        await wishlistPage.removeProductFromWishlist(productName);
        
        const isPresent = await wishlistPage.isProductInWishlist(productName);
        expect(isPresent).toBeFalsy();
    });
});
