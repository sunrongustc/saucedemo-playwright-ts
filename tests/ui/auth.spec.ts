import { test } from "../../fixtures/inventory.fixture";
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../../data/users';
import { InventoryPage } from '../../pages/InventoryPage';

test('Logout', async ({ inventoryPage, page }) => {
  await inventoryPage.logout();
  const loginPage = new LoginPage(page);
  await loginPage.expectLoaded();
});

test('Locked User Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = USERS.locked.username;
  const password = USERS.locked.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectUserLocked();
});