import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Saucedemo Add To Cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = "standard_user";
  const password = "secret_sauce";

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectInventoryLoaded();

  const inventoryPage = new InventoryPage(page);
  const item1 = "Sauce Labs Bolt T-Shirt"
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.openCart();
  await inventoryPage.expectItemInCart(item1);

});


