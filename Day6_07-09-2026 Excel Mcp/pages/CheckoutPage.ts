import { expect, type Locator, type Page } from '@playwright/test';

export interface CheckoutData { firstName: string; lastName: string; postalCode: string; }

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');
  }
  async expectLoaded(): Promise<void> { await expect(this.page.getByTestId('title')).toHaveText('Checkout: Your Information'); }
  async fill(data: Partial<CheckoutData>): Promise<void> {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.postalCode !== undefined) await this.postalCodeInput.fill(data.postalCode);
  }
  async continue(): Promise<void> { await this.continueButton.click(); }
  async cancel(): Promise<void> { await this.cancelButton.click(); }
  async expectError(): Promise<void> { await expect(this.errorMessage).toBeVisible(); }
}
