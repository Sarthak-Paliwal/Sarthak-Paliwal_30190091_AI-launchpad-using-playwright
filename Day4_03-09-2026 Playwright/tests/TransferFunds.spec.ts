import { test,expect } from '@playwright/test';
import { FundTransferPage } from '../pages/FundTransfer.page';
import { SummaryPage } from '../pages/verifyTranscation.page';
import { LoginPage } from '../pages/Login.page';
import fs from 'fs';
const loginData=JSON.parse(fs.readFileSync('test-data/loginData.json','utf-8'));
test('Funds Transfer in internal Accounts', async ({ page }) => {
  await page.goto('https://www.playwrightpad.in/sandbox/banking/', { waitUntil: 'networkidle' });
  const loginPage = new LoginPage(page);
  await loginPage.login(`${loginData.username}`, `${loginData.password}`);
  const fundTransferPage = new FundTransferPage(page);
  await fundTransferPage.TransferFunds();
  const summaryPage = new SummaryPage(page);
  const transactionAmount = await summaryPage.verifyTransactionAmount();
  console.log(`Transaction Amount: ${transactionAmount}`);
  expect(transactionAmount).toBe('-$100.00');
});

test.only('Funds Transfer in external Accounts', async ({ page }) => {
  await page.goto('https://www.playwrightpad.in/sandbox/banking/', { waitUntil: 'networkidle' });
  const loginPage = new LoginPage(page);
  await loginPage.login(`${loginData.username}`, `${loginData.password}`);
  const fundTransferPage = new FundTransferPage(page);
  await fundTransferPage.addNewBeneficiary();
  await fundTransferPage.TransferFundsExternal();
  const summaryPage = new SummaryPage(page);
  const transactionAmount = await summaryPage.verifyTransactionAmount();
  console.log(`Transaction Amount: ${transactionAmount}`);
  expect(transactionAmount).toBe('-$100.00');

});