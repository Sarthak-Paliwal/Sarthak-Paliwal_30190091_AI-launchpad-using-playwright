import { Page, expect } from '@playwright/test';
export class LoginPage{
    private usernameInput;
    private passwordInput;
    private loginButton;
    constructor(private page:Page){
        this.usernameInput=page.getByPlaceholder('Enter username');
        this.passwordInput=page.getByPlaceholder('Enter password');
        this.loginButton=page.getByRole('button', { name: 'LOGIN' });
    }   
    async login(username:string,password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        expect.soft(this.page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
    }
}