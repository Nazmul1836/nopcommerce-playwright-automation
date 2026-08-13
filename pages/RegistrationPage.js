class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name:'});
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name:' });
        this.emailInput = page.getByRole('textbox', { name: 'Email:' });
        this.companyNameInput = page.getByRole('textbox', { name: 'Company name:' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm password:' });
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree to the terms and' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }
    async openRegistrationPage() {
        await this.registerLink.click();
    }
    async registerUser(user) {
        await this.maleRadio.check();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.companyNameInput.fill(user.company);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.confirmPassword);
        await this.termsCheckbox.check();
        await this.registerButton.click();
    }

    async register(user) {
        await this.maleRadio.check();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.companyNameInput.fill(user.company);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.confirmPassword);
        await this.termsCheckbox.check();
        await this.registerButton.click();
    }
    async submitEmptyRegistrationForm() {
        await this.termsCheckbox.check();
        await this.registerButton.click();
    }
}

module.exports = { RegistrationPage };