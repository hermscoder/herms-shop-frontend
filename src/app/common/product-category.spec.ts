import { ProductCategory } from './product-category';

describe('ProductCategory', () => {
  it('should create an instance', () => {
    expect(newProductCategory(1, 'Books')).toBeTruthy();
  });
});

export function newProductCategory(
  id: number = 1,
  categoryName: string = ''
): ProductCategory {
  return new ProductCategory(id, categoryName)
}