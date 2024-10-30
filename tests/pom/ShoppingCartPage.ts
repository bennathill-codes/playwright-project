import { Locator, Page, expect } from '@playwright/test';

export default class ShoppingCartPage {
    public readonly title: Locator;
    public readonly inventoryItem: Locator;
    public readonly shoppingCartBadge: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;
    private readonly removeButton: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');
        this.removeButton = page.locator('button', { hasText: 'Remove' }).first();
    }

    // navigate back to products page from shopping cart
    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }

    // navigate to checkout from shopping cart
    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    // remove product from cart page
    async clickRemoveButton() {
        await this.removeButton.click();
    }

    // assert product name
    async validateProductName(itemPosition: number, productName: string) {
        await expect(this.inventoryItem.nth(itemPosition)).toContainText(productName);
    }

}