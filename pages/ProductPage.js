class ProductPage {
    constructor(page) {
        this.page = page;
        this.productOption = page.locator('#product_attribute_1');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
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
        await this.addToCartButton.click();
    }
    async goToShoppingCart() {
        await this.shoppingCartLink.click();
    }
    async goToHomePage() {
        await this.homePageLink.click();
    }
}
module.exports = { ProductPage };