import { test } from "../../fixtures/inventory.fixture";
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../../data/users';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe("Authentication", () => {

  test('@smoke @regression Logout', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    const loginPage = new LoginPage(page);
    await loginPage.expectLoaded();
  });

  test('@negative Locked User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectUserLocked();
  });

  test('@smoke @regression Auth state is reused', async ({ page }) => {
    await page.goto('/inventory.html');
    await new InventoryPage(page).expectInventoryLoaded();
  });

})