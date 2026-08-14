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
        for (let i = 0; i < 15; i++) {
            await this.page.locator('#ajaxBusy').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
            await this.page.waitForTimeout(1000);
            
            const confirmBtn = this.page.locator('.confirm-order-next-step-button, button:has-text("Confirm"), input[value="Confirm"]').and(this.page.locator(':visible'));
            if (await confirmBtn.count() > 0) {
                break;
            }

            await this.page.evaluate(() => {
                // Find all next step buttons that are visible (offsetParent is not null)
                const buttons = Array.from(document.querySelectorAll('.new-address-next-step-button, .shipping-method-next-step-button, .payment-method-next-step-button, .payment-info-next-step-button'));
                const visibleBtn = buttons.find(b => b.offsetParent !== null);
                if (visibleBtn) {
                    visibleBtn.click();
                } else {
                    // Try fallback text buttons
                    const fallback = Array.from(document.querySelectorAll('button, input[type="button"]')).find(b => 
                        (b.innerText && b.innerText.includes('Continue')) || (b.value && b.value.includes('Continue'))
                    );
                    if (fallback && fallback.offsetParent !== null) fallback.click();
                }
            });
        }
    }

    async getProductPriceFromCheckout() {
        // Extract product price from checkout page before placing order
        const priceText = await this.page.locator('text=/Total:/i').first().textContent().catch(() => '');
        const price = priceText?.match(/\$[\d,]+\.?\d*/)?.[0] || '';
        return price;
    }

    async confirmOrder() {
        await this.page.locator('#ajaxBusy').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
        
        let antiSpamTriggered = false;
        
        // Handle NopCommerce anti-spam dialog which blocks subsequent browser tests
        this.page.on('dialog', async dialog => {
            console.log('DIALOG OPENED:', dialog.message());
            if (dialog.message().includes('already placed another order')) {
                antiSpamTriggered = true;
            }
            await dialog.accept().catch(() => {});
        });
        
        for (let i = 0; i < 5; i++) {
            if (antiSpamTriggered) {
                console.log('Anti-spam dialog detected! Waiting 35 seconds for server rate limit to clear...');
                await this.page.waitForTimeout(35000);
                antiSpamTriggered = false;
            }
            
            console.log('Attempting confirm click...');
            const [response] = await Promise.all([
                this.page.waitForResponse(res => res.url().includes('OpcConfirmOrder') || res.url().includes('completed'), { timeout: 15000 }).catch(() => null),
                this.page.evaluate(() => {
                    const btns = Array.from(document.querySelectorAll('.confirm-order-next-step-button'));
                    const btn = btns.find(b => b.offsetParent !== null);
                    if (btn) btn.click();
                })
            ]);
            
            if (response) {
                console.log(`AJAX Response: ${response.status()} ${response.url()}`);
            } else {
                console.log('No AJAX Response detected within 15s');
            }
            
            try {
                await this.page.locator('.order-completed').waitFor({ state: 'visible', timeout: 4000 });
                break;
            } catch (e) {
                console.log('Retry confirm click natively...');
            }
        }
    }

    async getOrderNumber() {
        try {
            // Extract order number from confirmation page after placing order
            const allText = await this.page.locator('body').textContent();
            const match = allText?.match(/Order number[:\s]+(\d+)/i);
            return match?.[1] || '';
        } catch (error) {
            console.log('Could not extract order number:', error.message);
            return '';
        }
    }
}

module.exports = { CheckoutPage };