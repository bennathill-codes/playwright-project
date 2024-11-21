import { test, expect } from './base';

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.loginStandardUser();
  });

test.describe('Product Page', () => {
    test('should have products displayed', async ({ productPage }) => {
        await expect(productPage.inventoryItem).toHaveCount(6);
    });

    test('should add and remove products from cart', async ({ productPage }) => {
        await productPage.addProductToCart(0)
        await productPage.addProductToCart(4);
        await expect(productPage.shoppingCartBadge).toHaveText('2');

        await productPage.removeProductFromCart(0);
        await productPage.removeProductFromCart(4);
        await expect(productPage.shoppingCartBadge).toBeHidden();
    });

    test('should sort products', async ({ productPage }) => {
        // sort descending
        await productPage.clickSortDropdown();
        await productPage.selectSortDropdownOption('za');
        await productPage.validateProductName( 0, 'Test.allTheThings() T-Shirt (Red)');
        await productPage.validateProductName(5, 'Sauce Labs Backpack');

        // sort ascending
        await productPage.clickSortDropdown();
        await productPage.selectSortDropdownOption('az');
        await productPage.validateProductName(0, 'Sauce Labs Backpack');
        await productPage.validateProductName( 5, 'Test.allTheThings() T-Shirt (Red)');

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