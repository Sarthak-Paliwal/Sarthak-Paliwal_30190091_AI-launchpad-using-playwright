import { test, expect } from '../../fixtures/base.fixture';
import { flightData } from '../../utils/data-loader';

test.describe('PHPTRAVELS Flights functional and boundary scenarios', () => {
  test('[@smoke] Search one-way DUB to LON', async ({ flightSearch, flightResults }) => {
    const data = flightData.search('TD-001').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.selectRoute(data.origin, data.destination);
    await flightSearch.setDate(data.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightResults.expectSearchUrl(data.origin!, data.destination!, data.tripType!, data.cabin!, data.adults!, data.children!, data.infants!);
    await flightResults.expectRouteSummary(data.origin!, data.destination!);
  });

  test('[@regression] Submit a valid round-trip search', async ({ flightSearch, flightResults }) => {
    const data = flightData.search('TD-002').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.expectReturnDateVisible();
    await flightSearch.selectRoute(data.origin, data.destination);
    await flightSearch.setDate(data.departureDateOffsetDays!);
    await flightSearch.setDate(data.returnDateOffsetDays!, true);
    await flightSearch.selectCabin(data.cabin!);
    await flightSearch.setPassengers({ adults: data.adults!, children: data.children!, infants: data.infants! });
    await flightSearch.submit();
    await flightResults.expectRouteSummary(data.origin!, data.destination!);
  });

  test('[@regression] Configure a multi-city itinerary up to six segments', async ({ flightSearch }) => {
    const data = flightData.search('TD-003').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.expectSegmentCount(data.initialSegmentCount!);
    for (const [index, segment] of data.segments!.entries()) {
      if (index > 1) await flightSearch.addFlightsUntil(index + 1);
      await flightSearch.setSegment(segment, index);
    }
    await flightSearch.expectSegmentCount(data.maximumSegmentCount!);
    await flightSearch.expectAddFlightUnavailable();
  });

  test('[@regression] Preserve search form control state', async ({ flightSearch }) => {
    const route = flightData.search('TD-004').inputData;
    const date = flightData.search('TD-005').inputData;
    const cabin = flightData.search('TD-006').inputData;
    const passengers = flightData.search('TD-007').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(route.originSearch, route.destinationSearch);
    await flightSearch.setDate(date.futureDateOffset!);
    await flightSearch.selectCabin(cabin.defaultCabin!);
    await flightSearch.setPassengers(passengers.incremented!);
    await flightSearch.expectPassengerMinimums(passengers.minimum!);
  });

  test('[@regression] Submit without departure location', async ({ flightSearch }) => {
    const data = flightData.validation('TD-010').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(data.origin, data.destination);
    await flightSearch.setDate(data.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightSearch.expectSearchBlocked();
  });

  test('[@regression] Submit without arrival location', async ({ flightSearch }) => {
    const data = flightData.validation('TD-011').inputData;
    await flightSearch.open();
    await flightSearch.selectRoute(data.origin, data.destination);
    await flightSearch.setDate(data.departureDateOffsetDays!);
    await flightSearch.submit();
    await flightSearch.expectSearchBlocked();
  });

  test('[@regression] Add an unsupported seventh multi-city segment', async ({ flightSearch }) => {
    const data = flightData.search('TD-003').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.addFlightsUntil(data.maximumSegmentCount!);
    await flightSearch.expectSegmentCount(data.maximumSegmentCount!);
    await flightSearch.expectAddFlightUnavailable();
  });

  test('[@regression] Select the current/future date boundary', async ({ flightSearch }) => {
    const data = flightData.search('TD-005').inputData;
    await flightSearch.open();
    await flightSearch.setDate(data.currentDateOffsetDays!);
    await expect(flightSearch.page.getByLabel(/departure date/i).first()).toHaveValue(/[A-Z][a-z]{2} \d{2}, \d{4}/);
  });

  test('[@regression] Keep passenger counts at their minimum boundary', async ({ flightSearch }) => {
    const data = flightData.search('TD-007').inputData;
    await flightSearch.open();
    await flightSearch.setPassengers(data.minimum!);
    await flightSearch.expectPassengerMinimums(data.minimum!);
  });

  test('[@regression] Configure exactly six multi-city segments', async ({ flightSearch }) => {
    const data = flightData.search('TD-003').inputData;
    await flightSearch.open();
    await flightSearch.selectTripType(data.tripType!);
    await flightSearch.addFlightsUntil(data.maximumSegmentCount!);
    await flightSearch.expectSegmentCount(data.maximumSegmentCount!);
    await flightSearch.expectAddFlightUnavailable();
  });
});
