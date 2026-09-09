import { expect, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Complete!');
    await expect(this.page.getByTestId('complete-header')).toBeVisible();
  }
}
