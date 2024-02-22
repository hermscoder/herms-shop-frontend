import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    public customer: Customer;
    public shippingAddress: Address;
    public billingAddress: Address;
    public order: Order;
    public orderItems: OrderItem[];

    constructor(
        customer?: Customer,
        shippingAddress?: Address,
        billingAddress?: Address,
        order?: Order,
        orderItems?: OrderItem[]
    ) {
        if (this.customer != null) this.customer = customer!;
        if (this.shippingAddress != null) this.shippingAddress = shippingAddress!;
        if (this.billingAddress != null) this.billingAddress = billingAddress!;
        if (this.order != null) this.order = order!;
        if (this.orderItems != null) this.orderItems = orderItems!;
    }
}
