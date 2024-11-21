import { Locator, Page } from '@playwright/test';

export default class CheckoutPage {
    public readonly title: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private postalCodeField: Locator;
    private continueButton: Locator;
    private cancelButton: Locator;
    public errorMessage: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.postalCodeField = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.errorMessage = page.getByTestId('error');
    }

    // checkout page helper methods

    async enterFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterPostalCode(postalCode: string) {
        await this.postalCodeField.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async enterCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }
}