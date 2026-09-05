import { Page, expect } from '@playwright/test';

export class FormPage {
    constructor(private page: Page) {}

    private nameInput = '#name';
    private emailInput = '#email';

    private genderMaleRadio = '#gender';
    private genderFemaleRadio = 'input[value="female"]';
    private genderOtherRadio = 'input[value="other"]';

    private mobileInput = '#mobile';
    private dobInput = '#dob';
    private subjectInput = '#subjects';
    private hobbiesCheck = '#hobbies';
    private currentAddressInput = 'textarea[placeholder="Currend Address"]';

    private stateInput = '#state';
    private cityInput = '#city';

    private submitButton = 'input[type="submit"]';

    async openApp() {
        await this.page.goto(
            'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php'
        );
    }

    async fillForm(
        name: string,
        email: string,
        gender: string,
        mobile: string,
        dob: string,
        subject: string,
        hobbies: string,
        currentAddress: string,
        state: string,
        city: string
    ) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);

        switch (gender.toLowerCase()) {
            case 'male':
                await this.page.check(this.genderMaleRadio);
                break;

            case 'female':
                await this.page.check(this.genderFemaleRadio);
                break;

            default:
                await this.page.check(this.genderOtherRadio);
                break;
        }

        await this.page.fill(this.mobileInput, mobile);
        await this.page.type(this.dobInput, dob);
        await this.page.fill(this.subjectInput, subject);

        if (hobbies.trim().length > 0) {
            await this.page.check(this.hobbiesCheck);
        }

        await this.page.fill(this.currentAddressInput, currentAddress);

        await this.page.locator(this.stateInput).selectOption({
            label: state
        });

        await this.page.locator(this.cityInput).selectOption({
            label: city
        });
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    async verifyFormSubmission() {
        await expect(this.page.locator(this.submitButton)).toBeVisible();
    }
}