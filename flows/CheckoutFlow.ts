import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";

interface CheckoutData {
    firstName: string;
    lastName: string;
    zipCode: string;
}

export class CheckoutFlow {
    constructor(
        private inventoryPage: InventoryPage, private cartPage: CartPage, private checkoutPage: CheckoutPage) { }

    async startCheckout(item: string, data: CheckoutData) {
        await this.inventoryPage.addItemToCart(item);
        await this.inventoryPage.goToCart();

        await this.cartPage.expectItemVisible(item);
        await this.cartPage.checkout();

        await this.checkoutPage.fillInformation(data.firstName, data.lastName, data.zipCode);
    }
}






