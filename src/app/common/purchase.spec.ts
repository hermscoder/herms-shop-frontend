import { newAddress } from './address.spec';
import { newCustomer } from './customer.spec';
import { newOrderItem } from './order-item.spec';
import { newOrder } from './order.spec';
import { Purchase } from './purchase';

describe('Purchase', () => {
  it('should create an instance', () => {
    expect(newPurchase()).toBeTruthy();
  });
});

export function newPurchase() {
  return new Purchase(newCustomer(), newAddress(), newAddress(), newOrder(), [newOrderItem()])
}