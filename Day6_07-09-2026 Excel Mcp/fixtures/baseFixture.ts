import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutPage, type CheckoutData } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { JsonReader } from '../utils/JsonReader';
import { Logger } from '../utils/Logger';
import { ScreenshotUtil } from '../utils/ScreenshotUtil';

export interface UserCredentials { username: string; password: string; }
export interface LoginData { validUser: UserCredentials; invalidUser: UserCredentials; lockedUser: UserCredentials; }
export interface FrameworkFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginData: LoginData;
  checkoutData: CheckoutData;
}

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),
  loginData: async ({}, use) => use(JsonReader.read<LoginData>('testdata/loginData.json')),
  checkoutData: async ({}, use) => use(JsonReader.read<CheckoutData>('testdata/checkoutData.json')),
});

export { expect };

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    Logger.error(`${testInfo.title} failed`);
    await ScreenshotUtil.capture(page, testInfo, 'failure');
  }
});
