import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { ITEMS } from '../data/items';
import { CHECKOUT_DATA } from '../data/checkout.data';

test('Saucedemo Checkout Validation - Last Name Required ', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const username = USERS.standard.username;
  const password = USERS.standard.password;

  await loginPage.navigateTo();
  await loginPage.login(username, password);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectInventoryLoaded();
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.backpack);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(CHECKOUT_DATA.firstName, "", CHECKOUT_DATA.zipCode);

  await checkoutPage.expectLastNameRequiredError();
});


