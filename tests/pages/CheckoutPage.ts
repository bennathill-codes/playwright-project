import { Locator, Page } from '@playwright/test';

export default class CheckoutPage {
    public readonly title: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private postalCodeField: Locator;
    private continueButton: Locator;
    private cancelButton: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.postalCodeField = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
    }

    // fill first name field
    async enterFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    // fill last name field
    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    // fill postal code field
    async enterPostalCode(postalCode: string) {
        await this.postalCodeField.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}