import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    private readonly checkoutButton: Locator;

    constructor(private readonly page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    }
    
    private cartItem(itemName: string) {
        return this.page.locator('[data-test="inventory-item"]', { hasText: itemName });
    }

    async checkout() {
        await this.checkoutButton.click();
    }
    
    async removeItem(itemName: string) {
        await this.cartItem(itemName).getByRole('button', { name: 'Remove' }).click();
    }
    
    async expectItemVisible(itemName: string) {
        await expect(this.cartItem(itemName)).toBeVisible();
    }

    async expectItemRemoved(itemName: string) {
        await expect(this.cartItem(itemName)).toHaveCount(0);
    }
}