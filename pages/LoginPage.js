class LoginPage{
    constructor(page){
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.emailInput = page.getByRole('textbox', { name: 'Email:' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
    }
    async goto() {
        await this.page.goto('/');
    }
     async openLoginPage() {
        await this.loginLink.click();
    }
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async logout() {
        await this.logoutLink.click();
    }
    

}
module.exports = { LoginPage };