import { useState } from '../src/use-state';

describe('useState', () => {
  it('can set and get state', () => {
    const state = useState<string>();
    state.set('foo');
    expect(state.get()).toEqual('foo');
  });

  describe('get()', () => {
    it('returns undefined if never set', () => {
      const state = useState<string>();
      expect(state.get()).toBeUndefined();
    });
  });
});
