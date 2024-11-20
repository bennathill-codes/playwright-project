import { test as base } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import ShippingOverviewPage from './pages/ShippingOverviewPage';

type MyFixtures = {
    loginPage: LoginPage,
    productPage: ProductPage,
    shoppingCartPage: ShoppingCartPage;
    checkoutPage: CheckoutPage;
    shippingOverviewPage: ShippingOverviewPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page))
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
    shippingOverviewPage: async ({ page }, use) => {
        await use(new ShippingOverviewPage(page))
    }
});

export { expect, type Page } from '@playwright/test';