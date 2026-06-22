import { test, expect } from "../../fixtures/inventory.fixture";
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import { ITEMS } from '../../data/items';
import { CHECKOUT_DATA } from "../../data/checkout.data";
import { CheckoutFlow } from "../../flows/CheckoutFlow";


test('Checkout Full Flow', async ({ inventoryPage, page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutFlow = new CheckoutFlow(inventoryPage, new CartPage(page), checkoutPage);
  await checkoutFlow.startCheckout(ITEMS.backpack, CHECKOUT_DATA)
  await checkoutPage.clickFinish();
  await checkoutPage.expectSuccessful();
});


test('Checkout Validation - First Name Required ', async ({ inventoryPage, page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutFlow = new CheckoutFlow(inventoryPage, new CartPage(page), checkoutPage);
  const newData = { ...CHECKOUT_DATA, firstName: "" };
  await checkoutFlow.startCheckout(ITEMS.backpack, newData);
  await checkoutPage.expectFirstNameRequiredError();
});


test('Checkout Validation - Last Name Required ', async ({ inventoryPage, page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutFlow = new CheckoutFlow(inventoryPage, new CartPage(page), checkoutPage);
  const newData = { ...CHECKOUT_DATA, lastName: "" };
  await checkoutFlow.startCheckout(ITEMS.backpack, newData);
  await checkoutPage.expectLastNameRequiredError();
});


test('Checkout Validation - Zip Code Required ', async ({ inventoryPage, page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutFlow = new CheckoutFlow(inventoryPage, new CartPage(page), checkoutPage);
  const newData = { ...CHECKOUT_DATA, zipCode: "" };
  await checkoutFlow.startCheckout(ITEMS.backpack, newData);
  await checkoutPage.expectZipCodeRequiredError();
});

