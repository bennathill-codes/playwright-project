import { Locator, Page } from '@playwright/test';

export default class ShippingOverviewPage {
    public readonly title: Locator;
    public cartTotal: Locator;
    private finishButton: Locator;
    private backToProductsButton: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.cartTotal = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.backToProductsButton = page.getByTestId('back-to-products');
    }

    async clickFinishButton() {
        this.finishButton.click();
    }

    async clickBackToProductsButton() {
        this.backToProductsButton.click();
    }
}