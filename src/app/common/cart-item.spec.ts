import { CartItem } from './cart-item';
import { newProduct } from './product.spec';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(newCartItem()).toBeTruthy();
  });
});

export function newCartItem(
  id: string = '',
  sku: string = '',
  name: string = '',
  description: string = '',
  unitPrice: number = 9.99,
  imageUrl: string = '',
  active: boolean = true,
  unitsInStock: number = 100,
  dateCreated: Date = new Date(),
  lastUpdated: Date = new Date()
): CartItem {
  return new CartItem(newProduct(id, sku, name, description, unitPrice, imageUrl, active, unitsInStock, dateCreated, lastUpdated))
}