import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import type { ResultData, ResultRefinementData } from '../types/flight-data';

export class FlightResultsPage extends BasePage {
  constructor(page: Page) { super(page); }

  async expectSearchUrl(origin: string, destination: string, tripType: string, cabin: string, adults: number, children: number, infants: number): Promise<void> {
    await expect.poll(() => new URL(this.page.url()).pathname.split('/').filter(Boolean)).toEqual(expect.arrayContaining([
      'flights', origin.toLowerCase(), destination.toLowerCase(), tripType.toLowerCase().replaceAll(' ', '').replace('multi-city', 'multicity'), cabin.toLowerCase().replaceAll(' ', '-'), String(adults), String(children), String(infants),
    ]));
  }

  async expectRouteSummary(origin: string, destination: string): Promise<void> {
    await expect.poll(() => new URL(this.page.url()).pathname.split('/').filter(Boolean).slice(0, 3)).toEqual(['flights', origin.toLowerCase(), destination.toLowerCase()]);
    await this.expectSupplierState();
  }

  async expectSupplierState(): Promise<void> {
    await expect(this.page.locator('main').filter({ hasText: /supplier|flight|result|available|unavailable|no flights/i }).first()).toBeVisible();
  }

  async expectResultDetails(data: ResultData): Promise<void> {
    await expect(this.page.getByText(/flight|result|available|unavailable|no flights/i).first()).toBeVisible();
  }

  async refine(data: ResultRefinementData): Promise<void> {
    const sort = this.page.locator('main select:visible').first();
    if (await sort.isVisible()) await sort.selectOption({ label: data.sortOptions[0] });
    const pageSize = this.page.locator('main select:visible').nth(1);
    if (await pageSize.isVisible()) await pageSize.selectOption(String(data.pageSizes[0]));
    if (data.clearFilters && await this.page.getByRole('button', { name: /clear filters/i }).isVisible()) await this.page.getByRole('button', { name: /clear filters/i }).click();
  }

  async expectBookNow(): Promise<void> { await expect(this.page.getByRole('button', { name: /book now/i }).first()).toBeVisible(); }
  async clickBookNow(): Promise<void> { await this.page.getByRole('button', { name: /book now/i }).first().click(); }
}
