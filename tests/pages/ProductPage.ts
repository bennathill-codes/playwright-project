import { Locator, Page, expect } from '@playwright/test';

export default class ProductPage {
    public readonly title: Locator;
    private readonly sideBarMenu: Locator;
    private readonly logout: Locator;
    public readonly inventoryItem: Locator;
    private readonly sortDropdown: Locator;
    public readonly shoppingCartBadge: Locator;
    public readonly shoppingCartLink: Locator;


    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.sideBarMenu = page.locator('.bm-burger-button');
        this.logout = page.getByTestId('logout-sidebar-link');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    }

    // product page helper methods 

    async clickSideBarMenu() {
        await this.sideBarMenu.click();
    }
    
    async clickLogOut() {
        await this.logout.click();
    }

    async addProductToCart(itemPosition: number) {
        await this.inventoryItem.nth(itemPosition).getByText('Add to cart').click();
    }

    async removeProductFromCart(itemPosition: number) {
        await this.inventoryItem.nth(itemPosition).getByText('Remove').click();
    }

    async clickSortDropdown() {
        await this.sortDropdown.click();
    }

    async selectSortDropdownOption(optionId: string) {
        await this.sortDropdown.selectOption({ value: optionId });
    }

    async validateProductName(itemPosition: number, productName: string) {
        await expect(this.inventoryItem.nth(itemPosition)).toContainText(productName);
    }

}