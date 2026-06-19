import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

test('Saucedemo Logout', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.standard.username;
  const password = USERS.standard.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectInventoryLoaded();
  await inventoryPage.logout();
  await loginPage.expectLoaded();

});


