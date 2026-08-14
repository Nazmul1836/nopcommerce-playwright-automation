class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree with the terms of' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    }

    async checkout(agreeToTerms = true) {
        if (agreeToTerms) {
            await this.termsCheckbox.check();
        }
        await this.checkoutButton.click();
    }

    async continueThroughCheckout() {
        for (let i = 0; i < 6; i++) {
            if (await this.page.getByRole('button', { name: 'Confirm' }).isVisible({ timeout: 500 }).catch(() => false)) {
                break;
            }
            const continueBtn = this.page.getByRole('button', { name: 'Continue' }).first();
            if (await continueBtn.isVisible({ timeout: 500 }).catch(() => false)) {
                await continueBtn.click();
                await this.page.waitForTimeout(500);
            } else {
                break;
            }
        }
    }

    async confirmOrder() {
        await this.page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Confirm'));
            if (btn) btn.click();
        });
        await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    }
}

module.exports = { CheckoutPage };