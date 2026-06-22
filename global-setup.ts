import { chromium, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { USERS } from "./data/users";
import { InventoryPage } from "./pages/InventoryPage";

export default async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL || "https://www.saucedemo.com/");
    await loginPage.login(
        USERS.standard.username,
        USERS.standard.password
    );

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectInventoryLoaded()

    await page.context().storageState({
        path: "storageState/auth.json",
    })

    await browser.close();
}