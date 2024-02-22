import { Order } from './order';

describe('Order', () => {
  it('should create an instance', () => {
    expect(newOrder()).toBeTruthy();
  });
});


export function newOrder(
  totalQuantity: number = 9.99,
  totalPrice: number = 9.99
): Order {
  return new Order(totalQuantity, totalPrice)
}
