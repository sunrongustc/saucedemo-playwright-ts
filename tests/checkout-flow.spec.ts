import { test, expect } from "../fixtures/inventory.fixture";
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { ITEMS } from '../data/items';


test('Checkout Full Flow', async ({ inventoryPage,page }) => {
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


