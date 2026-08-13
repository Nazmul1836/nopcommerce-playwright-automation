const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../pages/RegistrationPage');
const users = require('../../test-data/registration.json');
const { generateUniqueEmail } = require('../../utils/testData');
test.describe('User Registration', () => {
    test('REG-001: User can register with valid details', async ({ page }) => {
        const user = {
    ...users.validUser,
    email: generateUniqueEmail()
};
        const registrationPage = new RegistrationPage(page);
        await page.goto('/');
        await registrationPage.openRegistrationPage();
        await registrationPage.register(user);
        await expect(page.getByText('Your registration completed')).toBeVisible();
    });
    test('REG-002: User cannot register with an existing email', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await page.goto('/');
        await registrationPage.openRegistrationPage();
        await registrationPage.register(users.validUser);
        await expect(page.getByText('The specified email already exists')).toBeVisible();
    });
    test('REG-003: User cannot register with empty fields', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await page.goto('/');
        await registrationPage.openRegistrationPage();
        await registrationPage.submitEmptyRegistrationForm();
        await expect(page.getByText('First name is required.')).toBeVisible();
    });  
    test('REG-004: User cannot register with invalid email', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await page.goto('/');
        await registrationPage.openRegistrationPage();
        await registrationPage.register(users.invalidUser);
        await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
    });
});