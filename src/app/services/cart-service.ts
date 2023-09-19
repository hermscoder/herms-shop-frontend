import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

export class CartService {

    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

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

    decrementQuantity(cartItem: CartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            this.removeItemFromCart(cartItem);
        } else {
            this.computeCartTotals();
        }
    }

    removeItemFromCart(cartItemToRemove: CartItem) {
        const itemToRemoveIndex = this.cartItems.findIndex(cartItem => cartItem.id == cartItemToRemove.id);
        if (itemToRemoveIndex > -1) {
            this.cartItems.splice(itemToRemoveIndex, 1);

            this.computeCartTotals();
        }
    }

    computeCartTotals() {
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
