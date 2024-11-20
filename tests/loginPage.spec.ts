
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
