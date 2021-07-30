import { useState } from '../src/use-state';

describe('useState', () => {
  it('can set and get state', () => {
    const state = useState<string>('foo');
    state.set('bar');
    expect(state.get()).toEqual('bar');
  });

  describe('get()', () => {
    it('returns initialstate on first get', () => {
      const state = useState<string>('initialState');
      expect(state.get()).toEqual('initialState');
    });
  });
});
