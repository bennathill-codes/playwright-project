import { test, expect } from './base';

test.beforeEach(async ({ page, loginPage, productPage }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await loginPage.loginStandardUser();
    await productPage.addProductToCart(0)
    await productPage.addProductToCart(1);
    await productPage.addProductToCart(2);
    await productPage.shoppingCartLink.click();
  });

test.describe('Shopping Cart Page', () => {
    test('should display products in cart', async ({ shoppingCartPage }) => {
        await expect(shoppingCartPage.title).toHaveText('Your Cart');
        await expect(shoppingCartPage.shoppingCartBadge).toHaveText('3');
        await shoppingCartPage.validateProductName(0, 'Sauce Labs Backpack');
        await shoppingCartPage.validateProductName(1, 'Sauce Labs Bike Light');
        await shoppingCartPage.validateProductName(2, 'Sauce Labs Bolt T-Shirt');
    });

    test('should remove products in cart', async ({ shoppingCartPage }) => {
        await shoppingCartPage.clickRemoveButton();
        await shoppingCartPage.clickRemoveButton();
        await shoppingCartPage.clickRemoveButton();
        await expect(shoppingCartPage.inventoryItem).toHaveCount(0);
    });

    test('should navigate back to Product page after clicking Continue Shopping button', async ({ productPage, shoppingCartPage }) => {
        await shoppingCartPage.clickContinueShoppingButton();
        await expect(productPage.title).toContainText("Products");
    });

    test('should navigate to Checkout page after clicking Checkout button', async ({ shoppingCartPage, checkoutPage }) => {
        await shoppingCartPage.clickCheckoutButton();
        await expect(checkoutPage.title).toContainText("Checkout");
    });
});
