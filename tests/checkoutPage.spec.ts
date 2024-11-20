import { test, expect } from './base';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Checkout Workflow', () => {
    test('should complete checkout', async ({ loginPage, productPage, shoppingCartPage,checkoutPage, shippingOverviewPage }) => {
        await loginPage.loginStandardUser();

        // add products to cart
        await productPage.addProductToCart(0);
        await productPage.addProductToCart(1);
        await expect(productPage.shoppingCartBadge).toHaveText('2');
        
        // navigate to checkout page
        await productPage.shoppingCartLink.click();
        await shoppingCartPage.clickCheckoutButton();
        await expect(checkoutPage.title).toContainText('Information');

        // add user information for checkout
        await checkoutPage.enterFirstName('adc');
        await checkoutPage.enterLastName('def');
        await checkoutPage.enterPostalCode('12345');
        await checkoutPage.clickContinueButton();
        await expect(checkoutPage.title).toContainText('Overview');

        // assert shipping overview page total has value
        await expect(shippingOverviewPage.cartTotal).not.toBeEmpty();

        // navigate to complete checkout
        await shippingOverviewPage.clickFinishButton()
        await expect(shippingOverviewPage.title).toContainText('Complete');

        // navigate back to products from complete page
        await shippingOverviewPage.clickBackToProductsButton();
        await expect(productPage.title).toHaveText('Products');
    });
});