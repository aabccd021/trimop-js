import {
  isNone,
  isSome,
  None,
  optionArrayMapSome,
  optionFold,
  optionFromNullable,
  optionMapSome,
  Some,
} from '../src';

describe('isNone', () => {
  it('returns true if given none', () => {
    const either = None();
    expect(isNone(either)).toStrictEqual(true);
  });

  it('returns false if given some', () => {
    const either = Some('kira');
    expect(isNone(either)).toStrictEqual(false);
  });
});

describe('isSome', () => {
  it('returns true if given some', () => {
    const either = Some('kira');
    expect(isSome(either)).toStrictEqual(true);
  });

  it('returns false if given none', () => {
    const either = None();
    expect(isSome(either)).toStrictEqual(false);
  });
});

describe('optionFromNullable', () => {
  it('returns some if given nonNullable', () => {
    expect(optionFromNullable('kira')).toStrictEqual(Some('kira'));
  });

  it('returns none if given undefined', () => {
    expect(optionFromNullable(undefined)).toStrictEqual(None());
  });

  it('returns none if given null', () => {
    expect(optionFromNullable(undefined)).toStrictEqual(None());
  });
});

describe('optionFold', () => {
  const mapIfNone = () => 'No name';
  const mapIfSome = (value: string) => `The name is ${value}`;
  it('returns mapped some if given some', () => {
    const option = Some('Kira');
    expect(optionFold(option, mapIfNone, mapIfSome)).toStrictEqual('The name is Kira');
  });

  it('returns mapped none if given none', () => {
    const option = None();
    expect(optionFold(option, mapIfNone, mapIfSome)).toStrictEqual('No name');
  });
});

describe('optionMapSome', () => {
  const mapper = (value: string) => `The name is ${value}`;
  it('returns mapped some if given some and mapped to TResult', () => {
    const option = Some('Kira');
    expect(optionMapSome(option, mapper)).toStrictEqual(Some('The name is Kira'));
  });

  it('returns none if given none', () => {
    const option = None();
    expect(optionMapSome(option, mapper)).toStrictEqual(None());
  });
});

describe('optionArrayMapSome', () => {
  it('maps some elements', () => {
    expect(
      optionArrayMapSome([None(), Some('kira'), None(), Some('masumoto'), None()])
    ).toStrictEqual(['kira', 'masumoto']);
  });
});
