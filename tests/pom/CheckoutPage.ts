import { Locator, Page } from '@playwright/test';

export default class CheckoutPage {
    public readonly title: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
    }
}