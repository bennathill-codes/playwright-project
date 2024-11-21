import { Locator, Page } from '@playwright/test';

export default class ShippingOverviewPage {
    public readonly title: Locator;
    public cartTotal: Locator;
    public paymentInfo: Locator;
    public shippingInfo: Locator;
    public subTotal: Locator;
    public tax: Locator;
    public total: Locator;
    private finishButton: Locator;
    private cancelButton: Locator;


    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.cartTotal = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.cancelButton = page.getByTestId('cancel');
        this.paymentInfo = page.getByTestId('payment-info-value');
        this.shippingInfo = page.getByTestId('shipping-info-value');
        this.subTotal = page.getByTestId('subtotal-label');
        this.tax = page.getByTestId('tax-label');
        this.total = page.getByTestId('total-label');
    }

    // shipping overview page helper methods
    
    async clickFinishButton() {
        this.finishButton.click();
    }

    async clickCancelButton() {
        this.cancelButton.click();
    }
}