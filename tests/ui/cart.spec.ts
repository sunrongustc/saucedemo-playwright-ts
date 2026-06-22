import { test, expect } from "../../fixtures/inventory.fixture";
import { CartPage } from '../../pages/CartPage';
import { ITEMS } from '../../data/items';

test('One Item Added To Cart', async ({ inventoryPage, page }) => {
    await inventoryPage.addItemToCart(ITEMS.jacket);
    await inventoryPage.openCart()

    const cartPage = new CartPage(page);
    await cartPage.expectItemInCart(ITEMS.jacket);
});


test('One Item Removed From Cart', async ({ inventoryPage, page }) => {
    await inventoryPage.addItemToCart(ITEMS.jacket);
    await inventoryPage.openCart()

    const cartPage = new CartPage(page);
    await cartPage.expectItemInCart(ITEMS.jacket);
    await cartPage.removeItemFromCart(ITEMS.jacket);
    await cartPage.expectItemRemoved(ITEMS.jacket);
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

test('Cart Badge Reflects Correct Item Counts ', async ({ inventoryPage, page }) => {
    await inventoryPage.addItemToCart(ITEMS.light);
    await inventoryPage.expectCartBadgeCount(1);
    await inventoryPage.addItemToCart(ITEMS.backpack);
    await inventoryPage.expectCartBadgeCount(2);
    await inventoryPage.removeItemFromCart(ITEMS.light);
    await inventoryPage.expectCartBadgeCount(1);
});

