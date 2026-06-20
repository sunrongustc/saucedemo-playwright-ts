import { CHECKOUT_DATA } from "../data/checkout.data";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";


export class CheckoutFlow {
    constructor(
        private inventoryPage: InventoryPage, private cartPage: CartPage, private checkoutPage: CheckoutPage) { }

    async startCheckout(item: string, data: typeof CHECKOUT_DATA) {
        await this.inventoryPage.addItemToCart(item);
        await this.inventoryPage.openCart();

        await this.cartPage.expectItemInCart(item);
        await this.cartPage.clickCheckout();

        await this.checkoutPage.fillInformation(data.firstName, data.lastName, data.zipCode);
    }
}






