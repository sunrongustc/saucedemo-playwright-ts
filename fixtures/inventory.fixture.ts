import { test as base } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "../data/users";

type loginFixture = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage
}

export const test = base.extend<loginFixture>({
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateTo();
        await loginPage.login(USERS.standard.username, USERS.standard.password);
        await inventoryPage.expectInventoryLoaded();
        await use(inventoryPage);
    }
}
)

export { expect } from "@playwright/test";