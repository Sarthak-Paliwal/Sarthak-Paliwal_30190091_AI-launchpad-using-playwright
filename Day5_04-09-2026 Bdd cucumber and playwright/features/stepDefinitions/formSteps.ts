import { Given, When, Then } from "@cucumber/cucumber";
import { FormPage } from "../../pages/FormPage";
let formPage: FormPage;

Given('the user is on the form page', async function () {
  formPage = new FormPage(this.page);
  await formPage.openApp();
});

When(
  /^the user fills out the form with (.*), (.*), (.*), (.*), (.*), (.*), (.*), (.*), (.*), and (.*)$/,
  async function (
    name,
    email,
    gender,
    mobile,
    dob,
    subject,
    hobbies,
    currentAddress,
    state,
    city
  ) {
    await formPage.fillForm(
      name,
      email,
      gender,
      mobile,
      dob,
      subject,
      hobbies,
      currentAddress,
      state,
      city
    );
  }
);

Then('the form should be submitted successfully', async function () {
  await formPage.verifyFormSubmission();
});