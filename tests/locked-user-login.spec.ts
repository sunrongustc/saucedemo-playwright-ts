import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';

test('Saucedemo Locked User Login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.locked.username;
  const password = USERS.locked.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectUserLocked();

});


