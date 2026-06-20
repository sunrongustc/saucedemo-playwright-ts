import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  const username = USERS.standard.username;
  const password = USERS.standard.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);

  inventoryPage = new InventoryPage(page);
  await inventoryPage.expectInventoryLoaded();
})

test('Logout', async ({ page }) => {
  await inventoryPage.logout();
  await loginPage.expectLoaded();
});


