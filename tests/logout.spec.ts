import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "../fixtures/inventory.fixture";

test('Logout', async ({ inventoryPage, page }) => {
  await inventoryPage.logout();

  const loginPage = new LoginPage(page);
  await loginPage.expectLoaded();
});


