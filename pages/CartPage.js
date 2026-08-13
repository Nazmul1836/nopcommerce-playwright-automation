class CartPage {
    constructor(page) {
        this.page = page; 
        this.quantityUpButton = page.locator('[id^="quantity-up-"]');
        this.removeButton = page.locator('td:nth-child(8)');
    }
    async increaseQuantity() {
        await this.quantityUpButton.click();
    } 
    async removeProduct() {
        await this.removeButton.click();
    }
}  
module.exports = { CartPage };