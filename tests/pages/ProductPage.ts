import { Locator, Page, expect } from '@playwright/test';

export default class ProductPage {
    public readonly title: Locator;
    public readonly loginLogo: Locator;
    private readonly sideBarMenu: Locator;
    private readonly logout: Locator;
    public readonly inventoryItem: Locator;
    private readonly sortDropdown: Locator;
    public readonly shoppingCartBadge: Locator;
    public readonly shoppingCartLink: Locator;


    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.loginLogo = page.locator('.login_logo');
        this.sideBarMenu = page.locator('.bm-burger-button');
        this.logout = page.getByTestId('logout-sidebar-link');
        this.inventoryItem = page.getByTestId('inventory-item');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    }

    async clickSideBarMenu() {
        await this.sideBarMenu.click();
    }
    
    // click logout within sidebar menu
    async clickLogOut() {
        await this.logout.click();
    }

    // add product to cart by list position
    async addProductToCart(itemPosition: number) {
        await this.inventoryItem.nth(itemPosition).getByText('Add to cart').click();
    }

    // remove product from cart by list position
    async removeProductFromCart(itemPosition: number) {
        await this.inventoryItem.nth(itemPosition).getByText('Remove').click();
    }

    // click sorting dropdown
    async clickSortDropdown() {
        await this.sortDropdown.click();
    }

    // select sort dropdown option
    async selectSortDropdownOption(optionId: string) {
        await this.sortDropdown.selectOption({ value: optionId });
    }

    // assert product name
    async validateProductName(itemPosition: number, productName: string) {
        await expect(this.inventoryItem.nth(itemPosition)).toContainText(productName);
    }

}