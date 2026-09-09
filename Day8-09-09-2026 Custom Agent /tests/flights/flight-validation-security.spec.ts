import { test, expect } from '../../fixtures/base.fixture';
import { flightData } from '../../utils/data-loader';
import { isoDateFromOffset } from '../../utils/date-utils';
import type { ResultMutation } from '../../types/flight-data';

test.describe('PHPTRAVELS Flights validation and security scenarios', () => {
  test('[@regression] Reject invalid round-trip dates', async ({ flightSearch }) => {
    const data = flightData.validation('TD-012').inputData;
    const route = flightData.search('TD-001').inputData;
    const trip = flightData.search('TD-002').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(trip.tripType!);
    await flightSearch.selectRoute(route.origin, route.destination);
    await flightSearch.setDate(data.outboundDateOffsetDays!);
    await flightSearch.submit();
    await flightSearch.expectSearchBlocked();
    await flightSearch.setDate(data.earlierReturnDateOffsetDays!, true);
    await flightSearch.submit();
    await flightSearch.setDate(data.validReturnDateOffsetDays!, true);
    await expect(flightSearch.returnDateField).toHaveValue(isoDateFromOffset(data.validReturnDateOffsetDays!));
  });

  test('[@e2e] Safely reject tampered result URL parameters', async ({ page }) => {
    const mutations = flightData.mutations('TD-015').inputData;
    const route = flightData.search('TD-001').inputData;
    for (const mutation of mutations as ResultMutation[]) {
      const segments = [route.origin, route.destination, route.tripType!.toLowerCase().replaceAll(' ', '-'), route.cabin, mutation.parameter, mutation.value].map((segment) => encodeURIComponent(segment ?? ''));
      await page.goto(`/flights/${segments.join('/')}`);
      await expect(page).not.toHaveTitle(/payment|checkout/i);
    }
  });

  test('[@e2e] Treat markup-like input as inert data', async ({ flightSearch, page }) => {
    const data = flightData.validation('TD-016').inputData;
    await flightSearch.open();
    for (const payload of data.payloads!) {
      await flightSearch.fillDepartureInput(payload);
      await expect(page.locator('body')).not.toContainText(payload);
    }
    await expect(page.locator('body')).not.toContainText(/alert\('test'\)/i);
  });
});
