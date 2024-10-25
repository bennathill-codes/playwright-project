import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Landing Page', () => {
    test('should log in and log out', async ({ page }) => {
        await loginStandardUser(page);
        
        await expect(page.getByTestId('title')).toHaveText('Products');
        await page.locator('.bm-burger-button').click();
        await page.getByTestId('logout-sidebar-link').click();
        await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    });

    test('should not log in with invalid credentials', async ({ page }) => {
        await loginInvalidUser(page);

        // assert error banners
        await expect(page.getByTestId('error')).toBeVisible();
        await expect(page.getByTestId('error')).toContainText('Username and password do not match');
    });
});

test.describe('Product Page', () => {
    test('should have correct product count displayed', async ({ page }) => {
        await loginStandardUser(page);

        await expect(page.getByTestId('inventory-item')).toHaveCount(6);
    });

    test('should add and remove items from cart', async ({ page }) => {
        await loginStandardUser(page);

        // add items to cart
        await addProductToCart(page, 0)
        await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

        await addProductToCart(page, 4)
        await expect(page.getByTestId('remove-sauce-labs-onesie')).toBeVisible();

        // assert cart item count
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

        // remove items from cart
        await removeProductFromCart(page, 0);
        await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();

        await removeProductFromCart(page, 4)
        await expect(page.getByTestId('add-to-cart-sauce-labs-onesie')).toBeVisible();

        // assert cart item count
        await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
    });

    test('should sort products', async ({ page }) => {
        await loginStandardUser(page);

        const sortProducts = page.getByTestId('product-sort-container');

        // sort descending
        await sortProducts.click();
        await sortProducts.selectOption({ value: 'za' });
        await validateProductName(page, 0, 'Test.allTheThings() T-Shirt (Red)');
        await validateProductName(page, 5, 'Sauce Labs Backpack');

        // sort price (low to high)
        await sortProducts.click();
        await sortProducts.selectOption({ value: 'lohi' });
        await validateProductName(page, 0, 'Sauce Labs Onesie');
        await validateProductName(page, 5, 'Sauce Labs Fleece Jacket');

        // sort price (high to low)
        await sortProducts.click();
        await sortProducts.selectOption({ value: 'hilo'});
        await validateProductName(page, 0, 'Sauce Labs Fleece Jacket');
        await validateProductName(page, 5, 'Sauce Labs Onesie');
    });
});

test.describe('Shopping Cart Page', () => {
    test('should display products in cart', async ({ page }) => {
        await loginStandardUser(page);

        // add products to cart
        await addProductToCart(page, 0);
        await addProductToCart(page, 1);
        await addProductToCart(page, 2);

        // navigate to cart page
        await page.getByTestId('shopping-cart-link').click();
        await expect(page.getByTestId('title')).toHaveText('Your Cart');
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('3');

        // assert products displayed in cart
        await validateProductName(page, 0, 'Sauce Labs Backpack');
        await validateProductName(page, 1, 'Sauce Labs Bike Light');
        await validateProductName(page, 2, 'Sauce Labs Bolt T-Shirt');

        // remove products from cart
        await clickRemoveButton(page);
        await clickRemoveButton(page);
        await clickRemoveButton(page);

        // assert cart is empty
        await expect(page.getByTestId('inventory-item')).toHaveCount(0);
    });
});

test.describe('Checkout Workflow', () => {
    test('should complete checkout', async ({ page }) => {
        await loginStandardUser(page);

        // add products to cart
        await addProductToCart(page, 0);
        await addProductToCart(page, 1);
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
        
        // navigate to checkout page
        await page.getByTestId('shopping-cart-link').click();
        await page.getByTestId('checkout').click();
        await expect(page.getByTestId('title')).toContainText('Information');

        // add user information for checkout
        await page.getByTestId('firstName').fill('adc');
        await page.getByTestId('lastName').fill('def');
        await page.getByTestId('postalCode').fill('12345');
        await page.getByTestId('continue').click();
        await expect(page.getByTestId('title')).toContainText('Overview');

        // assert checkout total has value
        await expect(page.getByTestId('total-label')).not.toBeEmpty();

        // navigate to complete checkout
        await page.getByTestId('finish').click();
        await expect(page.getByTestId('title')).toContainText('Complete');

        // navigate back to products from complete page
        await page.getByTestId('back-to-products').click();
        await expect(page.getByTestId('title')).toHaveText('Products');
    });
});

// log in helper function
async function loginStandardUser(page: Page) {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
}
// invalid log in helper function
async function loginInvalidUser(page: Page) {
    await page.getByTestId('username').fill('invalid_user');
    await page.getByTestId('password').fill('invalid');
    await page.getByTestId('login-button').click();
}

// add product to cart by list position
async function addProductToCart(page: Page, listPosition: number) {
    await page.getByTestId('inventory-item').nth(listPosition).getByText('Add to cart').click();
}

// remove product from cart by list position
async function removeProductFromCart(page: Page, listPosition: number) {
    await page.getByTestId('inventory-item').nth(listPosition).getByText('Remove').click();
}

// remove product from cart page
async function clickRemoveButton(page: Page) {
    const removeButton = page.locator('button', { hasText: 'Remove' }).first();
    await removeButton.click();
  }

// helper to assert product
async function validateProductName(page: Page, listPosition: number, productName: string) {
    await expect(page.getByTestId('inventory-item').nth(listPosition)).toContainText(productName);
}