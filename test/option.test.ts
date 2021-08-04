import { isNone, isSome, none, some } from '../src';

describe('isSome', () => {
  it('returns true if given some', () => {
    const either = some('kira');
    expect(isSome(either)).toStrictEqual(true);
  });

  it('returns false if given none', () => {
    const either = none();
    expect(isSome(either)).toStrictEqual(false);
  });
});

describe('isNone', () => {
  it('returns true if given none', () => {
    const either = none();
    expect(isNone(either)).toStrictEqual(true);
  });

  it('returns false if given some', () => {
    const either = some('kira');
    expect(isNone(either)).toStrictEqual(false);
  });
});
