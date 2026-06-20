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

test('Cart Badge Reflects Correct Item Counts ', async ({ page }) => {
  await inventoryPage.addItemToCart(ITEMS.light);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.expectCartBadgeCount(2);
  await inventoryPage.removeItemFromCart(ITEMS.light);
  await inventoryPage.expectCartBadgeCount(1);
});

