import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.products = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: /open menu/i });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetLink = page.getByTestId('reset-sidebar-link');
    this.sortSelect = page.getByTestId('product-sort-container');
  }
  async expectLoaded(): Promise<void> { await expect(this.title).toHaveText('Products'); await expect(this.products.first()).toBeVisible(); }
  async goto(): Promise<void> { await this.page.goto('/inventory.html'); }
  async openCart(): Promise<void> { await this.cartLink.click(); }
  async openProduct(name: string): Promise<void> { await this.productNames.filter({ hasText: name }).click(); }
  async addProduct(name: string): Promise<void> { await this.products.filter({ hasText: name }).getByRole('button', { name: /add to cart/i }).click(); }
  async addFirstProduct(): Promise<string> {
    const product = this.products.first();
    const name = (await product.getByTestId('inventory-item-name').innerText()).trim();
    await product.getByRole('button', { name: /add to cart/i }).click();
    return name;
  }
  async selectSort(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> { await this.sortSelect.selectOption(value); }
  async openMenu(): Promise<void> { await this.menuButton.click(); }
  async logout(): Promise<void> { await this.openMenu(); await this.logoutLink.click(); }
  async resetAppState(): Promise<void> { await this.openMenu(); await this.resetLink.click(); }
}
