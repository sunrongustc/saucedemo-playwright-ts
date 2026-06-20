import { test, expect } from "../fixtures/inventory.fixture";
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { ITEMS } from '../data/items';
import { CHECKOUT_DATA } from '../data/checkout.data';

test('Checkout Validation - First Name Required ', async ({ inventoryPage,page }) => {
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

test('Checkout Validation - Last Name Required ', async ({ inventoryPage,page }) => {
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.backpack);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(CHECKOUT_DATA.firstName, "", CHECKOUT_DATA.zipCode);

  await checkoutPage.expectLastNameRequiredError();
});

test('Checkout Validation - Zip Code Required ', async ({ inventoryPage,page }) => {
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(ITEMS.backpack);
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillInformation(CHECKOUT_DATA.firstName, CHECKOUT_DATA.lastName, "");

  await checkoutPage.expectZipCodeRequiredError();
});


