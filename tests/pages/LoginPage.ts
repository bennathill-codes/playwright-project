import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly loginLogo: Locator;
    public readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLogo = page.locator('.login_logo');
        this.userNameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.loginError = page.getByTestId('error');
    }

    // navigate to login page
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // log in helper function
    async loginStandardUser() {
        await this.userNameField.fill('standard_user');
        await this.passwordField.fill('secret_sauce');
        await this.loginButton.click();
    }
    // invalid log in helper function
    async loginInvalidUser() {
        await this.userNameField.fill('invalid_user');
        await this.passwordField.fill('invalid');
        await this.loginButton.click();
    }

    async getLoginLogo(): Promise<string> {
        return this.loginLogo.innerText();
    }

    async getLoginErrorMessage(): Promise<string> {
        return await this.loginError.innerText();
    }
}