class AccountPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToOrders() {
        await this.page.goto('/customer/orders');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
    }

    async getFirstOrderDetails() {
        // Get page content to verify order exists
        const pageContent = await this.page.content();
        
        // Try to extract order number from page (should appear in table or list)
        const orderMatch = pageContent.match(/Order\s*#?\s*:?\s*(\d+)/i);
        const orderNumber = orderMatch?.[1] || '';
        
        // Try to get product name and price from the page
        const priceMatch = pageContent.match(/\$[\d,]+\.?\d*/);
        const productPrice = priceMatch?.[0] || '';

        return {
            orderNumber,
            productName: '', // We'll verify this is present
            productPrice: productPrice
        };
    }
}

module.exports = { AccountPage };

