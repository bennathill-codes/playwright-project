import { test, expect } from './base';

test.beforeEach(async ({ page, loginPage, productPage, shoppingCartPage }) => {
    await page.goto('https://www.saucedemo.com/');

    await loginPage.loginStandardUser();
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);
    await productPage.shoppingCartLink.click();
    await shoppingCartPage.clickCheckoutButton();
  });

test.describe('Checkout Page', () => {
    test('should complete checkout', async ({ checkoutPage }) => {
        await expect(checkoutPage.title).toContainText('Information');
        await checkoutPage.enterFirstName('adc');
        await checkoutPage.enterLastName('def');
        await checkoutPage.enterPostalCode('12345');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.title).toContainText('Checkout: Overview');
    });

    test('should navigate back to Products page', async ({ checkoutPage, shoppingCartPage}) => {
        await checkoutPage.clickCancelButton();
        await expect(shoppingCartPage.title).toContainText('Cart');
    });

    test('should display error for empty fields', async ({ checkoutPage }) => {
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
        await checkoutPage.enterFirstName('abc')
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.errorMessage).toContainText('Error: Last Name is required');
        await checkoutPage.enterLastName('def');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.errorMessage).toContainText('Error: Postal Code is required');
    });
});