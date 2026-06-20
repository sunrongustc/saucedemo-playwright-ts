import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { ITEMS } from '../data/items';

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

test('Checkout Full Flow', async ({ page }) => {
  await inventoryPage.addItemToCart(ITEMS.jacket);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.jacket);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  const firstName = "Tina" + Date.now();
  const lastName = "Sun" + Date.now();
  const zipCode = "" + Date.now();
  await checkoutPage.fillInformation(firstName, lastName, zipCode);
  await checkoutPage.clickFinish();
  await checkoutPage.expectSuccessful();
});


