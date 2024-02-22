import { Customer } from './customer';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(newCustomer('John', 'Trevis', 'johntrevis@mail.com')).toBeTruthy();
  });
});

export function newCustomer(
  firstName: string = '',
  lastName: string = '',
  email: string = ''
): Customer {
  return new Customer(firstName, lastName, email)
}