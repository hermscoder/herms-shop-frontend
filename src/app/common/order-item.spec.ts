import { newCartItem } from './cart-item.spec';
import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(newOrderItem()).toBeTruthy();
  });
});

export function newOrderItem(
  totalQuantity: number = 9.99,
  totalPrice: number = 9.99
): OrderItem {
  return new OrderItem(newCartItem())
}