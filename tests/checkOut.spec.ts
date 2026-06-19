import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';

test('Saucedemo Checkout Flow', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.standard.username;
  const password = USERS.standard.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  await loginPage.expectInventoryLoaded();

  const inventoryPage = new InventoryPage(page);
  const item1 = "Sauce Labs Bolt T-Shirt"
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(item1);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  const firstName = "Tina" + Date.now();
  const lastName = "Sun" + Date.now();
  const zipCode = "" + Date.now();
  await checkoutPage.fillInformation(firstName, lastName, zipCode);
  // await checkoutPage.expectCheckoutOverviewItems(item1);
  await checkoutPage.clickFinish();
  await checkoutPage.expectSuccessful();
});


