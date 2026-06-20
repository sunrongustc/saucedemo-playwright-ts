import { test, expect } from "../fixtures/inventory.fixture";
import { CartPage } from '../pages/CartPage';
import { ITEMS } from '../data/items';

test('One Item Added To Cart', async ({ inventoryPage, page }) => {
    const item1 = "Sauce Labs Bolt T-Shirt"
    await inventoryPage.addItemToCart(item1);
    await inventoryPage.openCart()

    const cartPage = new CartPage(page);
    await cartPage.expectItemInCart(item1);
});


test('One Item Removed From Cart', async ({ inventoryPage, page }) => {
    const item1 = "Sauce Labs Bolt T-Shirt"
    await inventoryPage.addItemToCart(item1);
    await inventoryPage.openCart()

    const cartPage = new CartPage(page);
    await cartPage.expectItemInCart(item1);
    await cartPage.removeItemFromCart(item1);
    await cartPage.expectItemRemoved(item1);

});


test('Multiple Items Cart Management Flow', async ({ inventoryPage, page }) => {
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

