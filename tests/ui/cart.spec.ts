import { test, expect } from "../../fixtures/inventory.fixture";
import { CartPage } from '../../pages/CartPage';
import { ITEMS } from '../../data/items';

test.describe("Shopping Cart", () => {

    test('@smoke @regression One Item Added To Cart', async ({ inventoryPage, page }) => {
        await inventoryPage.addItemToCart(ITEMS.jacket);
        await inventoryPage.expectCartCount(1);
        await inventoryPage.goToCart()

        const cartPage = new CartPage(page);
        await cartPage.expectItemVisible(ITEMS.jacket);
    });

    test('@regression One Item Removed From Cart', async ({ inventoryPage, page }) => {
        await inventoryPage.addItemToCart(ITEMS.jacket);
        await inventoryPage.goToCart()

        const cartPage = new CartPage(page);
        await cartPage.expectItemVisible(ITEMS.jacket);
        await cartPage.removeItem(ITEMS.jacket);
        await cartPage.expectItemRemoved(ITEMS.jacket);
    });

    test('@regression Multiple Items Cart Management Flow', async ({ inventoryPage, page }) => {
        // Add items automatically to avoid hardcoding 
        for (const item of Object.values(ITEMS)) {
            await inventoryPage.addItemToCart(item);
        }
        await inventoryPage.goToCart();
        await inventoryPage.expectCartCount(Object.values(ITEMS).length);

        const cartPage = new CartPage(page);
        for (const item of Object.values(ITEMS)) {
            await cartPage.expectItemVisible(item);
        }

        await cartPage.removeItem(ITEMS.backpack);
        await cartPage.expectItemRemoved(ITEMS.backpack);

        const remainItems = Object.values(ITEMS).filter(item => item !== ITEMS.backpack)
        for (const item of remainItems) {
            await cartPage.expectItemVisible(item);
        }
    });

    test('@regression Cart Badge Reflects Correct Item Counts ', async ({ inventoryPage, page }) => {
        await inventoryPage.addItemToCart(ITEMS.light);
        await inventoryPage.expectCartCount(1);

        await inventoryPage.addItemToCart(ITEMS.backpack);
        await inventoryPage.expectCartCount(2);
        
        await inventoryPage.removeItemFromCart(ITEMS.light);
        await inventoryPage.expectCartCount(1);
    });
})