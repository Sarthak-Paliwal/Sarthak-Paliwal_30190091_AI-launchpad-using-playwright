import { test, expect } from '../fixtures/baseFixture';

test.describe('Login @login @regression', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('TC-001 / SC-001 valid login @smoke @sanity', async ({ loginPage, inventoryPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.validUser.username, loginData.validUser.password); await inventoryPage.expectLoaded(); });
  test('TC-002 / SC-002 invalid credentials @smoke @sanity', async ({ loginPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password); await loginPage.expectError('Username and password do not match'); });
  test('TC-003 / SC-003 empty username @sanity', async ({ loginPage, loginData }) => { await loginPage.goto(); await loginPage.login('', loginData.validUser.password); await loginPage.expectError('Username is required'); });
  test('TC-004 / SC-004 empty password @sanity', async ({ loginPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.validUser.username, ''); await loginPage.expectError('Password is required'); });
  test('TC-005 / SC-005 locked user @smoke @sanity', async ({ loginPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.lockedUser.username, loginData.lockedUser.password); await loginPage.expectError('locked out'); });
  test('TC-006 / SC-006 session survives refresh @smoke', async ({ page, loginPage, inventoryPage, loginData }) => { await loginPage.goto(); await loginPage.login(loginData.validUser.username, loginData.validUser.password); await inventoryPage.expectLoaded(); await page.reload(); await inventoryPage.expectLoaded(); await expect(page).toHaveURL(/inventory\.html/); });
});
