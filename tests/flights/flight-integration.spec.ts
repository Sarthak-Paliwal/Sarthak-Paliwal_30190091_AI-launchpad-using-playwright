import { test, expect } from '../../fixtures/base.fixture';
import { flightData } from '../../utils/data-loader';
import type { ResultRefinementData } from '../../types/flight-data';

test.describe('PHPTRAVELS Flights integration and end-to-end scenarios', () => {
  test('[@smoke] Report supplier-backed search state', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    const supplier = flightData.integration('TD-013').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(search.origin, search.destination);
    await flightSearch.setDate(search.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectSupplierState();
    expect(supplier.successState?.supplierStatus).toBeTruthy();
  });

  test('[@e2e] Handle unavailable supplier data safely', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    const supplier = flightData.integration('TD-013').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(search.origin, search.destination);
    await flightSearch.setDate(search.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectSupplierState();
    expect(supplier.unavailableState?.resultCount).toBe(0);
    await expect(flightResults.page.locator('body')).not.toContainText(/guaranteed live rate/i);
  });

  test('[@e2e] Preserve context in the demo booking handoff', async ({ flightSearch, flightResults }) => {
    const data = flightData.integration('TD-014').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(data.search?.origin, data.search?.destination);
    await flightSearch.setDate(data.search?.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectBookNow();
    await flightResults.clickBookNow();
    await expect(flightResults.page.locator('body')).not.toContainText(/real payment|credit card number/i);
  });

  test('[@e2e] Keep demo booking safety boundaries', async ({ flightSearch, flightResults }) => {
    const data = flightData.integration('TD-014').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(data.search?.origin, data.search?.destination);
    await flightSearch.setDate(data.search?.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectBookNow();
    expect(data.paymentData).toBeTruthy();
    await expect(flightResults.page.locator('body')).not.toContainText(/real payment|credit card number/i);
  });

  test('[@regression] Keep supplier result refinement consistent', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    const refinement = flightData.result('TD-009').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(search.origin, search.destination);
    await flightSearch.setDate(search.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.refine(refinement as ResultRefinementData);
    await expect(flightResults.page).toHaveURL(/flights/);
  });
});
