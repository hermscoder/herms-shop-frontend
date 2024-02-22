import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(newProduct()).toBeTruthy();
  });
});

export function newProduct(
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
): Product {
  return new Product(id, sku, name, description, unitPrice, imageUrl, active, unitsInStock, dateCreated, lastUpdated)
}
