import { test, expect } from "../../fixtures/inventory.fixture";
import { SORT_PATTERN } from "../../data/sort.pattern";

test.describe("Inventory Sorting", () => {
    test('@regression Items are sorted by price from low to high', async ({ inventoryPage }) => {
        await inventoryPage.selectSortPattern(SORT_PATTERN.lh);
        const prices = await inventoryPage.getPrices();
        expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    });

    test('@regression Items are sorted alphabetically from A to Z', async ({ inventoryPage }) => {
        await inventoryPage.selectSortPattern(SORT_PATTERN.az);
        const titles = await inventoryPage.getTitles();
        expect([...titles].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))).toEqual(titles);
    });
})
