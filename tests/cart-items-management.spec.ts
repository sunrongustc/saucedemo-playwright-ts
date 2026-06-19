import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { ITEMS } from '../data/items';

test('Saucedemo Cart Items Management Flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const username = USERS.standard.username;
    const password = USERS.standard.password;

    await loginPage.navigateTo();
    await loginPage.login(username, password);
    await loginPage.expectInventoryLoaded();

    const inventoryPage = new InventoryPage(page);

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

    const remainItems = Object.values(ITEMS).filter(item=>item!==ITEMS.backpack)
    for (const item of remainItems) {
        await cartPage.expectItemInCart(item);
    }
});


