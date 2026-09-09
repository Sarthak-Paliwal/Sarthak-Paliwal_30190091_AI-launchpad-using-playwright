import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }
  async goto(): Promise<void> { await this.page.goto('/'); }
  async login(username: string, password: string): Promise<void> { await this.usernameInput.fill(username); await this.passwordInput.fill(password); await this.loginButton.click(); }
  async expectLoaded(): Promise<void> { await expect(this.loginButton).toBeVisible(); }
  async expectError(message?: string | RegExp): Promise<void> { await expect(this.errorMessage).toBeVisible(); if (message) await expect(this.errorMessage).toContainText(message); }
}
