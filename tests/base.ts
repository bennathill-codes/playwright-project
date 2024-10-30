import { test as base } from '@playwright/test';
import LoginPage from './pom/LoginPage';
import ProductPage from './pom/ProductPage';
import ShoppingCartPage from './pom/ShoppingCartPage';
import CheckoutPage from './pom/CheckoutPage';
import ShippingOverviewPage from './pom/ShippingOverviewPage';

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