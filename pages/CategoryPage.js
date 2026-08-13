class CategoryPage {
    constructor(page) {
        this.page = page;
    } 
    async openCategory(categoryName) {
        await this.page.getByRole('link', { name: categoryName }).click();
    }
}  
module.exports = { CategoryPage };