class WishlistPage {
    constructor(page) {
        this.page = page;
        this.wishlistTable = page.locator('.wishlist-content, .table-wrapper');
        this.addToCartButton = page.locator('button[name="addtocartbutton"], .wishlist-add-to-cart-button');
        this.emptyWishlistMessage = page.getByText('The wishlist is empty!');
    }

    async goto() {
        await this.page.goto('/wishlist');
    }

    async isProductInWishlist(productName) {
        const productLink = this.page.locator('.wishlist-content, .table-wrapper').getByRole('link', { name: productName, exact: true });
        return await productLink.isVisible().catch(() => false);
    }

    async selectAddToCartForProduct(productName) {
        const row = this.page.locator('tr', { hasText: productName });
        const checkbox = row.locator('input[name="addtocart"]');
        await checkbox.check();
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async removeProductFromWishlist(productName) {
        const row = this.page.locator('tr', { hasText: productName });
        const removeBtn = row.locator('button.remove-btn, button[name="updatecart"], input.remove-from-cart-button');
        const removeCheckbox = row.locator('input[name="removefromcart"]');
        
        if (await removeBtn.isVisible().catch(() => false)) {
            await removeBtn.click();
        } else if (await removeCheckbox.isVisible().catch(() => false)) {
            await removeCheckbox.check();
            const updateBtn = this.page.locator('button[name="updatecart"], .update-wishlist-button, input[name="updatecart"]');
            await updateBtn.first().click();
        } else {
            // Click any remove button in the table row
            await row.locator('button, input[type="button"]').first().click().catch(() => {});
        }
        await this.page.waitForTimeout(1000);
    }
}

module.exports = { WishlistPage };
