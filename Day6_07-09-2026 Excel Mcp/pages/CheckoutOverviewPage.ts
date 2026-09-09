import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly items: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }
  async expectLoaded(): Promise<void> { await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview'); }
  async finish(): Promise<void> { await this.finishButton.click(); }
}
