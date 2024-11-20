import { test, expect } from './base';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Product Page', () => {
    test('should have correct product count displayed', async ({ loginPage, productPage }) => {
        await loginPage.loginStandardUser();

        await expect(productPage.inventoryItem).toHaveCount(6);
    });

    test('should add and remove items from cart', async ({ loginPage, productPage }) => {
        await loginPage.loginStandardUser();

        // add items to cart
        await productPage.addProductToCart(0)
        await productPage.addProductToCart(4);

        // assert cart item count
        await expect(productPage.shoppingCartBadge).toHaveText('2');

        // remove items from cart
        await productPage.removeProductFromCart(0);
        await productPage.removeProductFromCart(4);

        // assert cart item count
        await expect(productPage.shoppingCartBadge).toBeHidden();
    });

    test('should sort products', async ({ loginPage, productPage }) => {
        await loginPage.loginStandardUser();

        // sort descending
        await productPage.clickSortDropdown();
        await productPage.selectSortDropdownOption('za');
        await productPage.validateProductName( 0, 'Test.allTheThings() T-Shirt (Red)');
        await productPage.validateProductName(5, 'Sauce Labs Backpack');

        // sort price (low to high)
        await productPage.clickSortDropdown();
        await productPage.selectSortDropdownOption('lohi');
        await productPage.validateProductName(0, 'Sauce Labs Onesie');
        await productPage.validateProductName(5, 'Sauce Labs Fleece Jacket');

        // sort price (high to low)
        await productPage.clickSortDropdown();
        await productPage.selectSortDropdownOption('hilo');
        await productPage.validateProductName(0, 'Sauce Labs Fleece Jacket');
        await productPage.validateProductName(5, 'Sauce Labs Onesie');
    });
});