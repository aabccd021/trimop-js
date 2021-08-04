import { getStateController } from '../src/get-state-controller';

describe('useState', () => {
  it('can set and get state', () => {
    const state = getStateController<string>('foo');
    state.set('bar');
    expect(state.get()).toEqual('bar');
  });

  describe('get()', () => {
    it('returns initialstate on first get', () => {
      const state = getStateController<string>('initialState');
      expect(state.get()).toEqual('initialState');
    });
  });
});
