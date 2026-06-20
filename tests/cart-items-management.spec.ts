import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
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

test('One Item Added To Cart', async ({ page }) => {
  const item1 = "Sauce Labs Bolt T-Shirt"
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.openCart()
    
  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(item1);
});


test('One Item Removed From Cart', async ({ page }) => {
  const item1 = "Sauce Labs Bolt T-Shirt"
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.openCart()
    
  const cartPage = new CartPage(page);
  await cartPage.expectItemInCart(item1);
  await cartPage.removeItemFromCart(item1);
  await cartPage.expectItemRemoved(item1);

});


test('Multiple Items Cart Management Flow', async ({ page }) => {
    for (const item of Object.values(ITEMS)) {
        await inventoryPage.addItemToCart(item);
    }
    await inventoryPage.openCart()

    const cartPage = new CartPage(page);
    for (const item of Object.values(ITEMS)) {
        await cartPage.expectItemInCart(item);
    }

    await cartPage.removeItemFromCart(ITEMS.backpack);
    await cartPage.expectItemRemoved(ITEMS.backpack);

    const remainItems = Object.values(ITEMS).filter(item => item !== ITEMS.backpack)
    for (const item of remainItems) {
        await cartPage.expectItemInCart(item);
    }
});

