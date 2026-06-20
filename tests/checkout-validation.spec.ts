import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { ITEMS } from '../data/items';
import { CHECKOUT_DATA } from '../data/checkout.data';

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

test('Checkout Validation - First Name Required ', async ({ page }) => {
  await inventoryPage.addItemToCart(ITEMS.light);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.light);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation("", CHECKOUT_DATA.lastName, CHECKOUT_DATA.zipCode);
  // await checkoutPage.expectCheckoutOverviewItems(ITEMS.light);
  await checkoutPage.expectFirstNameRequiredError();
});

test('Checkout Validation - Last Name Required ', async ({ page }) => {
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.backpack);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(CHECKOUT_DATA.firstName, "", CHECKOUT_DATA.zipCode);

  await checkoutPage.expectLastNameRequiredError();
});

test('Checkout Validation - Zip Code Required ', async ({ page }) => {
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.backpack);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(CHECKOUT_DATA.firstName, CHECKOUT_DATA.lastName, "");

  await checkoutPage.expectZipCodeRequiredError();
});


