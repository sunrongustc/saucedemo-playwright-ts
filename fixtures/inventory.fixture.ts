import { test as base } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

type loginFixture = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage
}

export const test = base.extend<loginFixture>({
    inventoryPage: async ({ page }, use) => {
        await page.goto('/inventory.html')
        await use(new InventoryPage(page));
    }
}
)

export { expect } from "@playwright/test";