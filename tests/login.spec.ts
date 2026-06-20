import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

test('Standard User Login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.standard.username;
  const password = USERS.standard.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectInventoryLoaded();

});

test('Locked User Login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.locked.username;
  const password = USERS.locked.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectUserLocked();

});
