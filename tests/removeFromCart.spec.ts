import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('Saucedemo Remove From Cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = "standard_user";
  const password = "secret_sauce";

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectInventoryLoaded();

  const inventoryPage = new InventoryPage(page);
  const item1 = "Sauce Labs Bolt T-Shirt"
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.openCart()
    
  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(item1);
  await cartPage.removeItemFromCart(item1);
  await cartPage.expectItemRemoved(item1);

});


