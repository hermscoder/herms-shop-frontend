import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

export class CartService {
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    addToCart(newCartItem: CartItem) {
        let alreadyInCart = false;
        let existingCartItem: CartItem | undefined;

        if (this.cartItems.length > 0) {
            existingCartItem = this.cartItems.find(cartItem => cartItem.id == newCartItem.id);
            alreadyInCart = (existingCartItem != undefined);
        }
        if (alreadyInCart) {
            existingCartItem!.quantity += 1;
        } else {
            this.cartItems.push(newCartItem);
        }
        this.computeCartTotals();
    }
    private computeCartTotals() {
        console.log(JSON.stringify(this.cartItems));
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        this.cartItems.forEach(cartItem => {
            totalPriceValue += cartItem.quantity * cartItem.unitPrice;
            totalQuantityValue += cartItem.quantity;
        })

        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
    }
}
