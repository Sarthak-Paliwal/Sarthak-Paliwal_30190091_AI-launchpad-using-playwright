import { test, expect } from '../fixtures/baseFixture';

const sortCases = [
  { id: 'TC-010 / SC-018', value: 'az' as const, label: 'Name A-Z', ordered: 'ascending' },
  { id: 'TC-011 / SC-019', value: 'za' as const, label: 'Name Z-A', ordered: 'descending' },
  { id: 'TC-012 / SC-020', value: 'lohi' as const, label: 'Price Low-High', ordered: 'ascending' },
  { id: 'TC-013 / SC-021', value: 'hilo' as const, label: 'Price High-Low', ordered: 'descending' },
];

test.describe('Inventory and sorting @inventory @regression', () => {
  test.beforeEach(async ({ inventoryPage }) => { await inventoryPage.goto(); await inventoryPage.expectLoaded(); });
  test('TC-007 / SC-007 product catalog display @smoke', async ({ inventoryPage }) => { await expect(inventoryPage.products).toHaveCount(6); await expect(inventoryPage.productNames.first()).toBeVisible(); await expect(inventoryPage.productPrices.first()).toBeVisible(); });
  test('TC-008 / SC-009 expected product count @sanity', async ({ inventoryPage }) => { await expect(inventoryPage.products).toHaveCount(6); });
  test('TC-009 / SC-015 product details match selected card @sanity', async ({ page, inventoryPage }) => { const product = inventoryPage.products.first(); const name = await product.getByTestId('inventory-item-name').innerText(); const price = await product.getByTestId('inventory-item-price').innerText(); await inventoryPage.openProduct(name); await expect(page.getByTestId('inventory-item-name')).toHaveText(name); await expect(page.getByTestId('inventory-item-price')).toHaveText(price); });
  for (const sortCase of sortCases) {
    test(`${sortCase.id} ${sortCase.label} @sanity`, async ({ inventoryPage }) => {
      await inventoryPage.selectSort(sortCase.value);
      const values = sortCase.value === 'az' || sortCase.value === 'za' ? await inventoryPage.productNames.allTextContents() : await inventoryPage.productPrices.allTextContents();
      const expected = [...values].sort((a, b) => sortCase.value === 'lohi' || sortCase.value === 'hilo' ? Number(a.replace('$', '')) - Number(b.replace('$', '')) : a.localeCompare(b));
      if (sortCase.ordered === 'descending') expected.reverse();
      expect(values).toEqual(expected);
    });
  }
});
