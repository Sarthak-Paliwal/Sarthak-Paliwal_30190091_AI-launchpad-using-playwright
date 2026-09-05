import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';
import { CustomWorld } from '../../support/world';

let login: LoginPage;

Given('the user is on the login page', async function (this: CustomWorld) {
    login = new LoginPage(this.page);
    await login.openApp();
});

When('the user enters valid username and password', async function (this: CustomWorld) {
    await login.login();
});

When('clicks the login button', async function (this: CustomWorld) {
    await login.clickLoginButton();
});

When('the user enters invalid username or password', async function (this: CustomWorld) {
    await login.enterInvalidCredentials();
});

When(
    'the user enters {string} and {string}',
    async function (
        this: CustomWorld,
        username: string,
        password: string
    ) {
        await login.enterCredentials(username, password);
        await login.clickLoginButton();
    }
);

Then('the user should be redirected to the dashboard page', async function (this: CustomWorld) {
    await login.verifyDashboardPage();
});

Then(
    'an error message should be displayed indicating invalid credentials',
    async function (this: CustomWorld) {
        await login.verifyInvalidCredentialsError();
    }
);