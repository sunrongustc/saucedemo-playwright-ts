import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    private readonly cartButton: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.cartButton = page.locator('a.shopping_cart_link');
        this.page = page;
    }

    async addItemToCart(itemName: string) {
        await this.page.locator(".inventory_item", { hasText: itemName })
            .getByRole("button", { name: "Add to cart" }).click();
    }

    async openCart() {
        await this.cartButton.click();
    }
}