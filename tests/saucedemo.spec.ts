
import { test, expect } from './base';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Log In Page', () => {
    test('should not log in with invalid credentials', async ({ loginPage }) => {
        await loginPage.loginInvalidUser();

        // assert error banners
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toContainText('Username and password do not match');
    });

    test('should log in and log out', async ({ loginPage, productPage }) => {
        await loginPage.loginStandardUser();
        await expect(productPage.title).toHaveText('Products');
        
        await productPage.clickSideBarMenu();
        await productPage.clickLogOut()
        await expect(productPage.loginLogo).toBeVisible();
    });
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