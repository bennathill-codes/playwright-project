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
        await expect(page.getByTestId('error')).toBeVisible();
        await expect(page.getByTestId('error')).toContainText('Username and password do not match');
    });
});

async function loginStandardUser(page: Page) {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
}

async function loginInvalidUser(page: Page) {
    await page.getByTestId('username').fill('invalid_user');
    await page.getByTestId('password').fill('invalid');
    await page.getByTestId('login-button').click();
}