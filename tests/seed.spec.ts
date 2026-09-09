import { test, expect } from '../fixtures/base.fixture';

test('seed', async ({ page }) => {
  await page.goto('/');
  expect(page).toBeDefined();
});
