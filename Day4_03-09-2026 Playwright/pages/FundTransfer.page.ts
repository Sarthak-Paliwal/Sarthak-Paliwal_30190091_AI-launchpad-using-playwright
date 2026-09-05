import { Page, expect } from "@playwright/test";
import fs from 'fs';
let transferData=JSON.parse(fs.readFileSync('test-data/transferDetails.json','utf-8'));
let beneficiaryData=JSON.parse(fs.readFileSync('test-data/beneficiaryDetails.json','utf-8'));
export class FundTransferPage{
    private fundTransferLink;
    private transferTypeDropdown;
    private fromAccountDropdown;
    private toAccountDropdown;
    private amountInput;
    private transferButton;
    private addBeneficiaryButton;
    private beneficiaryNameInput;
    private acceountNumberInput;
    private savebeneficiaryButton;
    constructor(private page:Page){
        this.fundTransferLink=page.locator("#tab-transfers")
        this.transferTypeDropdown=page.locator('#transfer-type')
        this.fromAccountDropdown=page.locator('#from-acc')
        this.toAccountDropdown=page.locator('#to-acc')
        this.amountInput=page.getByRole('spinbutton', { name: '0.00' });
        this.transferButton=page.getByRole('button', { name: 'Execute Transfer' })
        this.addBeneficiaryButton=page.locator("//button[@id='add-beneficiary']//*[name()='svg']")
        this.beneficiaryNameInput=page.getByPlaceholder('e.g. John Doe');
        this.acceountNumberInput=page.getByPlaceholder('e.g. 1234567890');
        this.savebeneficiaryButton=page.getByRole('button', { name: 'Save Beneficiary' })
        
    }
   
    async TransferFunds(){
        await this.fundTransferLink.click();
        await this.transferTypeDropdown.selectOption({value:`internal`});
        await this.fromAccountDropdown.selectOption({ index: transferData.fromAccountIndex });
        await this.toAccountDropdown.selectOption({ index: transferData.toAccountIndex });
        await this.amountInput.fill(transferData.amount);
        await this.transferButton.click();
        await expect.soft(this.page.locator('div.transfer-success-msg')).toBeVisible();
    }
    async TransferFundsExternal(){
        await this.fundTransferLink.click();
        await this.transferTypeDropdown.selectOption({value:`external`});
        await this.page.locator('#bene-select').selectOption({ index: beneficiaryData.beneficiaryIndex });
        await this.amountInput.fill(transferData.amount);
        await this.page.locator('button:has-text("Initiate Wire")').click();
        let otp=await this.page.locator('strong.otp-display-code').textContent();
        await this.page.getByRole('textbox', { name: 'Enter 6-digit OTP' }).fill(otp ?? '');
        await this.page.getByRole('button', { name: 'Verify' }).click();
        await expect.soft(this.page.locator('div.transfer-success-msg')).toBeVisible();
    }
    async addNewBeneficiary(){
        await this.fundTransferLink.click();
        await this.addBeneficiaryButton.click();
        await this.beneficiaryNameInput.fill(`${beneficiaryData.beneficiaryName}`);
        await this.acceountNumberInput.fill(`${beneficiaryData.beneficiaryAccountNumber}`); 
        await this.savebeneficiaryButton.click();
    }

}