const { test, expect } = require('@playwright/test');
const { CategoryPage } = require('../../pages/CategoryPage');
const categories = require('../../test-data/category.json');
test.describe('Category Navigation', () => {
    test('CAT-001: User can navigate to a category page', async ({ page }) => {
        const categoryPage = new CategoryPage(page); 
        const categoryName = categories.category.name;
        await page.goto('/');
        await categoryPage.openCategory(categoryName);
        await expect(
            page.getByRole('heading', {
                name: categoryName,
                exact: true
            })
        ).toBeVisible();
    });   

    });