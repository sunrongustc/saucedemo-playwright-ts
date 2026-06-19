import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    private readonly checkoutButton: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
        this.page = page;
    }

    async expectItemInCart(itemName: string) {
        await expect(this.page.locator('.cart_item', { hasText: itemName })).toBeVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}