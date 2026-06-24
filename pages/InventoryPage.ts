import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    private readonly cartLink: Locator;
    private readonly burgMenu: Locator;
    private readonly logoutButton: Locator;
    private readonly cartBadge: Locator;
    private readonly sortBox: Locator;

    constructor(private readonly page: Page) {
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.burgMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' })
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortBox = page.getByRole('combobox');
    }

    async addItemToCart(itemName: string) {
        //Locate the item container first and then locate the button within it
        await this.page.locator('[data-test="inventory-item"]', { hasText: itemName })
            .getByRole("button", { name: "Add to cart" }).click();
    }

    async removeItemFromCart(itemName: string) {
        await this.page.locator('[data-test="inventory-item"]', { hasText: itemName })
            .getByRole('button', { name: 'Remove' }).click();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async expectCartCount(count: number) {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async selectSortPattern(pattern: string) {
        await this.sortBox.selectOption(pattern);
    }

    async getPrices(): Promise<number[]> {
        const itemTitleArray = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
        return itemTitleArray.map(item =>
            Number(item.replace("$", "")));
    }

    async getTitles(): Promise<string[]> {
        return await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    async expectInventoryPageLoaded() {
        await expect(this.page.locator('[data-test="inventory-container"]')).toBeVisible();
    }

    async logout() {
        await this.burgMenu.click();
        //Wait for logout button after menu animation
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
    }

}