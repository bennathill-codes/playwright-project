import { test, expect } from './base';

test.beforeEach(async ({ page, loginPage, productPage, shoppingCartPage, checkoutPage }) => {
    await page.goto('https://www.saucedemo.com/');

    await loginPage.loginStandardUser();
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await productPage.shoppingCartLink.click();
    await shoppingCartPage.clickCheckoutButton();
    await checkoutPage.enterCheckoutInfo('abc', 'def', '123');
    await checkoutPage.clickContinueButton();
  });

test.describe('Shipping Overview Page', () => {
    test('should have all shipping information', async ({ shippingOverviewPage }) => {
        await expect(shippingOverviewPage.paymentInfo).not.toBeEmpty();
        await expect(shippingOverviewPage.shippingInfo).not.toBeEmpty();
        await expect(shippingOverviewPage.subTotal).not.toBeEmpty();
        await expect(shippingOverviewPage.tax).not.toBeEmpty();
        await expect(shippingOverviewPage.cartTotal).not.toBeEmpty();
    });

    test('should complete purchase', async ({ shippingOverviewPage }) => {
        await shippingOverviewPage.clickFinishButton()
        await expect(shippingOverviewPage.title).toContainText('Complete');
    });

    test('should navigate back to Product page after clicking Cancel button', async ({ shippingOverviewPage, productPage }) => {
        await shippingOverviewPage.clickCancelButton();
        await expect(productPage.title).toHaveText('Products');
    });
});