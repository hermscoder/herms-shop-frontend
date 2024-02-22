import { State } from './state';

describe('State', () => {
  it('should create an instance', () => {
    expect(newState()).toBeTruthy();
  });
});

export function newState(
  id: number = 1,
  name: string = 'Minas Gerais'
): State {
  return new State(id, name)
}