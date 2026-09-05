import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(
        private page: Page
    ) {}

    // Locators
    private txtUser = '#user-name';
    private txtPass = '#password';
    private btnLogin = '#login-button';
    private errorMessage = "h3[data-test='error']";
    private appLogo = 'div.app_logo';

    async openApp() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login() {
        console.log('Entering valid credentials');

        await this.page.fill(this.txtUser, 'standard_user');
        await this.page.fill(this.txtPass, 'secret_sauce');
    }

    async clickLoginButton() {
        console.log('Clicking the login button');

        await this.page.click(this.btnLogin);
    }

    async verifyDashboardPage() {
        console.log('Verifying dashboard page');

        await expect(this.page).toHaveURL(/inventory/);

        const logo = this.page.locator(this.appLogo);
        await expect(logo).toBeVisible();
    }

    async enterInvalidCredentials() {
        console.log('Entering invalid credentials');

        await this.page.fill(this.txtUser, 'invalid_user');
        await this.page.fill(this.txtPass, 'wrong_password');

        await this.page.click(this.btnLogin);
    }

    async verifyInvalidCredentialsError() {
        console.log('Verifying invalid credentials error message');

        const errorLocator = this.page.locator(this.errorMessage);

        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText(
            'Username and password do not match'
        );
    }

    async enterCredentials(
        username: string,
        password: string
    ) {
        console.log(`Logging in with user: ${username}`);

        await this.page.fill(this.txtUser, username);
        await this.page.fill(this.txtPass, password);
    }
}