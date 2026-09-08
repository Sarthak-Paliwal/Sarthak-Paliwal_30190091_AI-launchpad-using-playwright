import { test, expect } from '../fixtures/baseFixture';

test.describe('Cart @cart @regression', () => {
  test.beforeEach(async ({ inventoryPage }) => { await inventoryPage.goto(); await inventoryPage.expectLoaded(); });
  test('TC-014 / SC-023 add one product @smoke @sanity', async ({ inventoryPage, cartPage }) => { const name = await inventoryPage.addFirstProduct(); await inventoryPage.openCart(); await cartPage.expectLoaded(); await cartPage.expectItem(name); });
  test('TC-015 / SC-024 add multiple products @smoke', async ({ inventoryPage, cartPage }) => { const first = await inventoryPage.addFirstProduct(); const second = await inventoryPage.products.nth(1).getByTestId('inventory-item-name').innerText(); await inventoryPage.addProduct(second); await inventoryPage.openCart(); await cartPage.expectItem(first); await cartPage.expectItem(second); await expect(cartPage.items).toHaveCount(2); });
  test('TC-016 / SC-025 remove product @sanity', async ({ inventoryPage, cartPage }) => { const name = await inventoryPage.addFirstProduct(); await inventoryPage.openCart(); await cartPage.removeItem(name); await expect(cartPage.items.filter({ hasText: name })).toHaveCount(0); });
  test('TC-017 / SC-026 cart persists across navigation @sanity', async ({ page, inventoryPage, cartPage }) => { const name = await inventoryPage.addFirstProduct(); await inventoryPage.openCart(); await cartPage.expectItem(name); await page.reload(); await cartPage.expectItem(name); });
});
