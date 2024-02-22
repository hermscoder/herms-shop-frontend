import { Country } from './country';

describe('Country', () => {
  it('should create an instance', () => {
    expect(newCountry()).toBeTruthy();
  });
});

export function newCountry(
  id: number = 9.99,
  code: string = 'BR',
  name: string = 'Brasil'
): Country {
  return new Country(id, code, name)
}