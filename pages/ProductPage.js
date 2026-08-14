class ProductPage {
    constructor(page) {
        this.page = page;
        this.productOption = page.locator('#product_attribute_1');
        this.addToCartButton = page.locator('#add-to-cart-button-3, #add-to-cart-button-7, button.add-to-cart-button');
        this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart', exact: true });
        this.homePageLink = page.getByRole('link', { name: 'Home page' });

    }
   async openProduct(productName) {
        await this.page.getByRole('link', { name: productName, exact: true }).click();
    }
    async selectProductColorOption(optionValue) 
    {
        await this.productOption.selectOption(optionValue);
    }
    async addToCart() {
        await this.addToCartButton.first().click();
        // Wait for the AJAX "product added" notification before proceeding
        await this.page.locator('#bar-notification .success').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
    async goToShoppingCart() {
        await this.shoppingCartLink.click();
    }
    async goToHomePage() {
        await this.homePageLink.click();
    }
}
module.exports = { ProductPage };