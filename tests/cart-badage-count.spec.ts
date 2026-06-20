import { test, expect } from "../fixtures/inventory.fixture";
import { ITEMS } from '../data/items';


test('Cart Badge Reflects Correct Item Counts ', async ({ inventoryPage,page }) => {
  await inventoryPage.addItemToCart(ITEMS.light);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.addItemToCart(ITEMS.backpack);
  await inventoryPage.expectCartBadgeCount(2);
  await inventoryPage.removeItemFromCart(ITEMS.light);
  await inventoryPage.expectCartBadgeCount(1);
});

