import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Saucedemo Login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = "standard_user";
  const password = "secret_sauce";

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectInventoryLoaded();

});


