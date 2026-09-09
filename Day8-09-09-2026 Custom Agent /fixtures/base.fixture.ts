import { test as base, expect } from '@playwright/test';
import { FlightResultsPage } from '../pages/flight-results.page';
import { FlightSearchPage } from '../pages/flight-search.page';

type FlightFixtures = {
  flightSearch: FlightSearchPage;
  flightResults: FlightResultsPage;
};

export const test = base.extend<FlightFixtures>({
  flightSearch: async ({ page }, use) => {
    await use(new FlightSearchPage(page));
  },
  flightResults: async ({ page }, use) => {
    await use(new FlightResultsPage(page));
  },
});

export { expect };
