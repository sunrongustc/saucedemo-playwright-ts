import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.zipCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.locator('input[type="submit"]')
        this.finishButton = page.getByRole('button', { name: 'Finish' })
        this.page = page;
    }

    async fillInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async expectCheckoutOverviewItems(itemName: string) {
        await expect(this.page.locator('.cart_item', { hasText: itemName })).toBeVisible();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async expectSuccessful() {
        await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    }

}