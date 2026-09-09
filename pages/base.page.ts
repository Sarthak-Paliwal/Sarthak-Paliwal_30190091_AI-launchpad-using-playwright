import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(public readonly page: Page) {}

  protected async selectFromAutocomplete(field: Locator, value: string): Promise<void> {
    const placeholder = (await field.getAttribute('placeholder')) ?? ((await field.textContent())?.match(/arrival/i) ? 'Arrival City or Airport' : 'Departure City or Airport');
    if (!placeholder) throw new Error('Autocomplete field has no route placeholder');
    if (!(await field.isVisible())) await this.page.getByText(placeholder, { exact: true }).first().click();
    const searchField = this.page.locator(`input[placeholder="${placeholder}"]:visible`).last();
    await searchField.fill(value);
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const suggestion = this.page.getByText(new RegExp(`^${escapedValue}$`, 'i')).last();
    await expect(suggestion).toBeVisible();
    await suggestion.click({ force: true });
  }

  protected async clickIfVisible(locator: Locator): Promise<boolean> {
    if (await locator.isVisible().catch(() => false)) {
      await locator.click();
      return true;
    }
    return false;
  }
}
