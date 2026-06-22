import { test, expect } from "../../fixtures/inventory.fixture";
import { SORT_PATTERN } from "../../data/sort.pattern";

test('@regression Sort items price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.selectSortPattern(SORT_PATTERN.lh);
    const prices = await inventoryPage.getPriceArray();
    expect([...prices].sort((a, b) => a - b)).toEqual(prices);
});

test('@regression Sort items from A to Z', async ({ inventoryPage }) => {
    await inventoryPage.selectSortPattern(SORT_PATTERN.az);
    const titles = await inventoryPage.getTitleArray();
    expect([...titles].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))).toEqual(titles);
});


