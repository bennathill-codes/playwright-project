import { test, expect } from './base';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Shopping Cart Page', () => {
    test('should add and remove products in cart', async ({ loginPage, productPage, shoppingCartPage }) => {
        await loginPage.loginStandardUser();

        // add products to cart
        await productPage.addProductToCart(0)
        await productPage.addProductToCart(1);
        await productPage.addProductToCart(2);

        // navigate to cart page
        await productPage.shoppingCartLink.click();
        await expect(shoppingCartPage.title).toHaveText('Your Cart');
        await expect(shoppingCartPage.shoppingCartBadge).toHaveText('3');

        // assert products displayed in cart
        await shoppingCartPage.validateProductName(0, 'Sauce Labs Backpack');
        await shoppingCartPage.validateProductName(1, 'Sauce Labs Bike Light');
        await shoppingCartPage.validateProductName(2, 'Sauce Labs Bolt T-Shirt');

        // remove products from cart
        await shoppingCartPage.clickRemoveButton();
        await shoppingCartPage.clickRemoveButton();
        await shoppingCartPage.clickRemoveButton();

        // assert cart is empty
        await expect(shoppingCartPage.inventoryItem).toHaveCount(0);
    });
});
