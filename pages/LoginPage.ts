import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto("/");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectInventoryLoaded() {
        await expect(this.page.locator('.inventory_container')).toBeVisible();
    }

    async expectUserLocked() {
        await expect(this.page.locator('[data-test="error"]')).toContainText("locked out");
    }
}