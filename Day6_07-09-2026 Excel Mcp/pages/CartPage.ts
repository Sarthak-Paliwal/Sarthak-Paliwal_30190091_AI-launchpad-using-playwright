import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-it');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.title = page.getByTestId('title');
  }

  async expectLoaded(): Promise<void> { await expect(this.title).toHaveText('Your Cart'); }
  async expectItem(name: string): Promise<void> { await expect(this.items.filter({ hasText: name })).toBeVisible(); }
  async removeItem(name: string): Promise<void> { await this.items.filter({ hasText: name }).getByRole('button', { name: /remove/i }).click(); }
  async checkout(): Promise<void> { await this.checkoutButton.click(); }
}
