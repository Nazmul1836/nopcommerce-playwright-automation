class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree with the terms of' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.orderConfirmationText = page.getByText(/Your order has been/i);
    }

    async checkout(agreeToTerms = true) {
        if (agreeToTerms) {
            await this.termsCheckbox.check();
        } else {
            await this.termsCheckbox.uncheck();
        }
        await this.checkoutButton.click();
    }

  
      async continueThroughCheckout() {
        for (let i = 0; i < 6; i++) {
            try {
                // Wait for Confirm to appear - if it does, we're done
                const confirmVisible = await this.page.getByRole('button', { name: 'Confirm' }).isVisible({ timeout: 1000 }).catch(() => false);
                if (confirmVisible) {
                    break;
                }

                // Find and click the first visible Continue button
                const continueButton = this.page.getByRole('button', { name: 'Continue' }).first();
                
                if (!(await continueButton.isVisible({ timeout: 1000 }).catch(() => false))) {
                    break;
                }

                await continueButton.click();
                await this.page.waitForTimeout(800);
            } catch (error) {
                // If page closed or other issue, break the loop
                break;
            }
        }
    }

    async confirmOrder() {
        try {
            // Use JavaScript to click the Confirm button directly
            await this.page.evaluate(() => {
                const confirmButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Confirm'));
                if (confirmButton) {
                    confirmButton.click();
                }
            });
            // Wait for navigation and page load
            await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
            await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        } catch (error) {
            console.error('Error confirming order:', error);
            throw error;
        }
    }
}

module.exports = { CheckoutPage };