const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const users = require('../../test-data/users.json');
test.describe('Authentication', () => {

    test('AUTH-001: User can login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.openLoginPage();
        await loginPage.login(
           users.admin.email,
            users.admin.password
        );
       
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        
    
        
    });
    
    test('AUTH-002: User cannot login with invalid email and valid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.openLoginPage();
        await loginPage.login(
            users.admin.invalidEmail,
            users.admin.password
        );
        await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again.')).toBeVisible();
    }); 
    
    test('AUTH-003: User cannot login with valid email and invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.openLoginPage();
        await loginPage.login(
            users.admin.email,
            users.admin.invalidPassword
        );
        await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again.')).toBeVisible();
    }); 
    test('AUTH-004: User cannot login with empty email and empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.openLoginPage();
        await loginPage.login(
            '',
            ''  
        );
        await expect(page.getByText('Please enter your email')).toBeVisible();
    });  
    test('AUTH-005: User can logout successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.openLoginPage();
        await loginPage.login(
            users.admin.email, 
            users.admin.password
        );
        await loginPage.logout();
        await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    });  


});