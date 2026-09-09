import { test, expect } from '../fixtures/baseFixture';

test.describe('Logout and session security @logout @regression', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('TC-022 / SC-037 successful logout @smoke @sanity', async ({ page, loginPage, inventoryPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.validUser.username, loginData.validUser.password); await inventoryPage.logout(); await loginPage.expectLoaded(); await expect(page).toHaveURL(/\/$/); });
  test('TC-023 / SC-042 unauthorized direct access @smoke @sanity', async ({ page, loginPage }) => { await loginPage.goto(); await page.goto('/inventory.html'); await expect(page).toHaveURL(/\/$/); await loginPage.expectLoaded(); });
});
