import { isNone, isSome, none, optionFold, optionFromNullable, optionMapSome, some } from '../src';

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

describe('optionFromNullable', () => {
  it('returns some if given nonNullable', () => {
    expect(optionFromNullable('kira')).toStrictEqual(some('kira'));
  });

  it('returns none if given undefined', () => {
    expect(optionFromNullable(undefined)).toStrictEqual(none());
  });

  it('returns none if given null', () => {
    expect(optionFromNullable(undefined)).toStrictEqual(none());
  });
});

describe('optionFold', () => {
  const mapIfNone = () => 'No name';
  const mapIfSome = (value: string) => `The name is ${value}`;
  it('returns mapped some if given some', () => {
    const option = some('Kira');
    expect(optionFold(option, mapIfNone, mapIfSome)).toStrictEqual('The name is Kira');
  });

  it('returns mapped none if given none', () => {
    const option = none();
    expect(optionFold(option, mapIfNone, mapIfSome)).toStrictEqual('No name');
  });
});

describe('optionMapSome', () => {
  const mapper = (value: string) => some(`The name is ${value}`);
  it('returns mapped some if given some', () => {
    const option = some('Kira');
    expect(optionMapSome(option, mapper)).toStrictEqual(some('The name is Kira'));
  });

  it('returns none if given none', () => {
    const option = none();
    expect(optionMapSome(option, mapper)).toStrictEqual(none());
  });
});
