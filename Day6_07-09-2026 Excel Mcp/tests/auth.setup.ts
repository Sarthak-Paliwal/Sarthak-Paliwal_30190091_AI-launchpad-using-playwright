import { test as setup, expect } from '@playwright/test';
import { JsonReader } from '../utils/JsonReader';

interface LoginData { validUser: { username: string; password: string } }
const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user for dependent suites', async ({ page }) => {
  const loginData = JsonReader.read<LoginData>('testdata/loginData.json');
  await page.goto('/');
  await page.getByTestId('username').fill(loginData.validUser.username);
  await page.getByTestId('password').fill(loginData.validUser.password);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: authFile });
});
