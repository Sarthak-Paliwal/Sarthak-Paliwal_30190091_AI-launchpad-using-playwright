import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { isoDateFromOffset } from '../utils/date-utils';
import type { FlightSegment, PassengerCounts, TripType } from '../types/flight-data';

export class FlightSearchPage extends BasePage {
  readonly departureField = this.page.locator('input[placeholder="Departure City or Airport"]').first();
  readonly arrivalField = this.page.locator('input[placeholder="Arrival City or Airport"]').first();
  readonly searchButton = this.page.getByRole('button', { name: /search flights/i });
  readonly returnDateField = this.page.getByLabel(/return date/i).first();
  readonly addFlightButton = this.page.getByRole('button', { name: /add flight/i });

  constructor(page: Page) { super(page); }

  async open(): Promise<void> {
    await this.page.goto('/#flights');
    const demoWarning = this.page.locator('#demoWarningModal');
    if (await demoWarning.isVisible()) await demoWarning.getByRole('button').last().click();
    if (!(await this.searchButton.isVisible())) await this.page.getByRole('tab', { name: /flights/i }).click();
    await expect(this.searchButton).toBeVisible({ timeout: 15000 });
  }

  async selectTripType(tripType: TripType): Promise<void> { await this.page.getByRole('button', { name: new RegExp(`\\b${tripType}\\b`, 'i') }).click(); }
  async selectRoute(origin: string | null | undefined, destination: string | null | undefined): Promise<void> {
    if (origin) await this.selectFromAutocomplete(this.departureField, origin);
    if (destination) await this.selectFromAutocomplete(this.arrivalField, destination);
  }
  async setDate(offsetDays: number, returnDate = false): Promise<void> {
    const field = returnDate ? this.returnDateField : this.page.getByLabel(/departure date/i).first();
    await this.selectDateField(field, isoDateFromOffset(offsetDays));
  }
  async selectCabin(cabin: string): Promise<void> {
    await this.page.getByRole('button', { name: /economy|business|first class/i }).click();
    await this.page.getByText(cabin, { exact: true }).last().click();
  }
  async setPassengers(passengers: PassengerCounts): Promise<void> {
    await this.page.getByText('Passengers', { exact: true }).first().click();
    await this.setPassengerCount('Adults', passengers.adults, 1);
    await this.setPassengerCount('Children', passengers.children, 0);
    await this.setPassengerCount('Infants', passengers.infants, 0);
  }
  async setSegment(segment: FlightSegment, segmentIndex = 0): Promise<void> {
    await this.selectFromAutocomplete(this.page.locator('input[placeholder="Departure City or Airport"]').nth(segmentIndex), segment.origin);
    await this.selectFromAutocomplete(this.page.locator('input[placeholder="Arrival City or Airport"]').nth(segmentIndex), segment.destination);
    await this.selectDateField(this.page.getByLabel(/departure date/i).nth(segmentIndex), isoDateFromOffset(segment.departureDateOffsetDays));
  }
  async addFlightsUntil(count: number): Promise<void> { while (await this.page.locator('input[placeholder="Departure City or Airport"]').count() < count) await this.addFlightButton.click(); }
  async submit(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.locator('.datepicker-overlay:visible').click({ position: { x: 1, y: 1 } }).catch(() => undefined);
    await this.searchButton.click();
  }
  async fillDepartureInput(value: string): Promise<void> {
    await this.page.getByText('Departure City or Airport', { exact: true }).first().click();
    await this.page.locator('input[placeholder="Departure City or Airport"]:visible').last().fill(value);
  }
  async expectAddFlightUnavailable(): Promise<void> {
    if (await this.addFlightButton.count()) await expect(this.addFlightButton).toBeDisabled(); else await expect(this.addFlightButton).toHaveCount(0);
  }
  private async selectDateField(field: Locator, targetDate: string): Promise<void> {
    await field.click({ force: true });
    const day = Number(targetDate.slice(-2));
    await this.page.locator('.day:not(.disabled):not(.new):visible').getByText(String(day), { exact: true }).click();
    await this.page.keyboard.press('Escape');
  }
  async expectValidationFor(field: Locator): Promise<void> { await expect(field).toHaveAttribute(/aria-invalid|class/, /true|invalid|error/i); }
  async expectSearchBlocked(): Promise<void> { await expect(this.page).not.toHaveURL(/\/flights\//); }
  async expectSegmentCount(count: number): Promise<void> { await expect(this.page.getByText(new RegExp(`${count}\\s*/\\s*6\\s*flights`, 'i'))).toBeVisible(); }
  async expectReturnDateVisible(): Promise<void> { await expect(this.returnDateField).toBeVisible(); }
  async expectPassengerMinimums(counts: PassengerCounts): Promise<void> { await expect(this.page.getByText(new RegExp(`${counts.adults}.*adult`, 'i'))).toBeVisible(); }
  private async setPassengerCount(label: string, target: number, minimum: number): Promise<void> {
    const row = this.page.getByText(new RegExp(label, 'i')).first().locator('..');
    const value = row.getByRole('spinbutton').first();
    await value.fill(String(target));
    await expect(value).toHaveValue(String(target));
    if (target === minimum) await expect(row.getByRole('button', { name: /decrease|minus|remove/i }).first()).toBeDisabled();
  }
}
