import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    private readonly cartButton: Locator;
    private readonly burgMenu: Locator;
    private readonly logoutButton: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.cartButton = page.locator('a.shopping_cart_link');
        this.burgMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' })
        this.page = page;
    }

    async addItemToCart(itemName: string) {
        await this.page.locator(".inventory_item", { hasText: itemName })
            .getByRole("button", { name: "Add to cart" }).click();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async logout(){
        await this.burgMenu.click();
        await this.logoutButton.click();
    }

    async expectInventoryLoaded() {
        await expect(this.page.locator('.inventory_container')).toBeVisible();
    }
}