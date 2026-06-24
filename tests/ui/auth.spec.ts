import { test } from "../../fixtures/inventory.fixture";
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../../data/users';

test.describe("User authentication and session", () => {

  test('@smoke @regression Logout', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    const loginPage = new LoginPage(page);
    await loginPage.expectLoginPageLoaded();
  });

  test('@negative @regression Locked user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectLockedUserError();
  });
})