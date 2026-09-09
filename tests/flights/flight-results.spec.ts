import { test, expect } from '../../fixtures/base.fixture';
import { flightData } from '../../utils/data-loader';
import type { FlightSearchPage } from '../../pages/flight-search.page';
import type { ResultRefinementData } from '../../types/flight-data';

test.describe('PHPTRAVELS Flights results scenarios', () => {
  async function openResults(flightSearch: FlightSearchPage, origin: string, destination: string, departureDateOffsetDays: number): Promise<void> {
    await flightSearch.open();
    await flightSearch.selectRoute(origin, destination);
    await flightSearch.setDate(departureDateOffsetDays);
    await flightSearch.submit();
  }

  test('[@regression] Compare returned flight details', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    await openResults(flightSearch, search.origin!, search.destination!, search.departureDateOffsetDays!);
    await flightResults.expectSupplierState();
  });

  test('[@regression] Refine flight results', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    const refinement = flightData.result('TD-009').inputData;
    await openResults(flightSearch, search.origin!, search.destination!, search.departureDateOffsetDays!);
    await flightResults.refine(refinement as ResultRefinementData);
    await flightResults.expectSupplierState();
  });

  test('[@regression] Preserve request state across form, URL, and results', async ({ flightSearch, flightResults }) => {
    const data = flightData.search('TD-001').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.selectRoute(data.origin, data.destination);
    await flightSearch.setDate(data.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectSearchUrl(data.origin!, data.destination!, data.tripType!, data.cabin!, data.adults!, data.children!, data.infants!);
    await flightResults.expectRouteSummary(data.origin!, data.destination!);
  });

  test('[@regression] Keep result page-size changes on the active query', async ({ flightSearch, flightResults }) => {
    const search = flightData.search('TD-001').inputData;
    const refinement = flightData.result('TD-009').inputData;
    await openResults(flightSearch, search.origin!, search.destination!, search.departureDateOffsetDays!);
    await flightResults.refine(refinement as ResultRefinementData);
    await expect(flightResults.page).toHaveURL(/flights/);
  });
});
