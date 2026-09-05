import { Page } from "@playwright/test";
export class SummaryPage{
    private summaryLink;
    private transactionAmount;
    constructor(private page:Page){
        this.summaryLink=page.getByRole('button', { name: 'Accounts Summary' })
        this.transactionAmount=page.locator("tbody tr:nth-child(1) td:nth-child(4)")
    }
    async verifyTransactionAmount(){
        await this.summaryLink.click();
        await this.transactionAmount.isVisible();
        let amount=await this.transactionAmount.textContent();
        return amount;
    }

}