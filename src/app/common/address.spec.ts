import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(newAddress('Arua', 'Uberlandia', 'Minas Gerais', 'Brasil', '38411000')).toBeTruthy();
  });
});


export function newAddress(
  street: string = '',
  city: string = '',
  state: string = '',
  country: string = '',
  zipCode: string = ''
): Address {
  return new Address(street, city, state, country, zipCode)
}