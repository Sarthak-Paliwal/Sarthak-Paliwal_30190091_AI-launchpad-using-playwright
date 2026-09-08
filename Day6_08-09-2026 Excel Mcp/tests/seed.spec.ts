import { test } from '../fixtures/baseFixture';

test('framework health check @sanity @regression', async ({ loginPage }) => {
  await loginPage.goto();
});
