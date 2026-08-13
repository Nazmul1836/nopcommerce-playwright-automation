class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: 'Search store' });
        this.searchButton = page.getByRole('button', {name: 'Search'});
      
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
    async openProduct(productName) {
      await this.page.getByRole('link', { name: productName, exact: true }).click();
    }
         
}
module.exports = { SearchPage };