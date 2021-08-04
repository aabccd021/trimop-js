import {
  Either,
  eitherArray,
  eitherArrayFilter,
  eitherArrayMap,
  eitherArrayReduce,
  eitherMapRight,
  isLeft,
  isRight,
  Left,
  Right,
} from '../src';

describe('isRight', () => {
  it('returns true if given right', () => {
    const either = Right('kira');
    expect(isRight(either)).toStrictEqual(true);
  });

  it('returns false if given left', () => {
    const either = Left('masumoto');
    expect(isRight(either)).toStrictEqual(false);
  });
});

describe('isLeft', () => {
  it('returns true if given left', () => {
    const either = Left('masumoto');
    expect(isLeft(either)).toStrictEqual(true);
  });

  it('returns false if given right', () => {
    const either = Right('kira');
    expect(isLeft(either)).toStrictEqual(false);
  });
});

describe('eitherMapRight', () => {
  const mapper = (value: string) => Right(`name is ${value}`);
  it('returns left if given left', () => {
    const either = Left('invalid name error');
    expect(eitherMapRight(either, mapper)).toStrictEqual(Left('invalid name error'));
  });

  it('returns mapped right if given right', () => {
    const either = Right('kira');
    expect(eitherMapRight(either, mapper)).toStrictEqual(Right('name is kira'));
  });
});

describe('eitherArray', () => {
  it('returns right array if there is no left in array', () => {
    const arr: Either<number, string>[] = [Right('kira'), Right('masumoto')];
    expect(eitherArray(arr)).toStrictEqual(Right(['kira', 'masumoto']));
  });

  it('returns left if there is a left in array', () => {
    const arr: Either<number, string>[] = [Right('kira'), Left(404), Right('masumoto')];
    expect(eitherArray(arr)).toStrictEqual(Left(404));
  });
});

describe('eitherArrayFilter', () => {
  const arr: string[] = ['kira', 'masumoto'];
  it('returns filtered array if filter function returns right', () => {
    const filter = (t: string) => Right(t.length > 5);
    expect(eitherArrayFilter(arr, filter)).toStrictEqual(Right(['masumoto']));
  });

  it('returns left if filter function returns left', () => {
    const filter = () => Left('dummy error');
    expect(eitherArrayFilter(arr, filter)).toStrictEqual(Left('dummy error'));
  });
});

describe('eitherArrayMap', () => {
  const arr: number[] = [21, 46];
  it('returns mapped array if mapper function returns right', () => {
    const mapper = (t: number) => Right(t * 2);
    expect(eitherArrayMap(arr, mapper)).toStrictEqual(Right([42, 92]));
  });

  it('returns left if mapper function returns left', () => {
    const mapper = () => Left('dummy error');
    expect(eitherArrayMap(arr, mapper)).toStrictEqual(Left('dummy error'));
  });
});

describe('eitherArrayReduce', () => {
  const arr: string[] = ['kira', 'masumoto'];
  it('returns reduced if reducer function returns right', () => {
    const reducer = (acc: string, t: string) => Right(`${acc} ${t}`);
    const initialValue = Right('my name is');
    expect(eitherArrayReduce(arr, initialValue, reducer)).toStrictEqual(
      Right('my name is kira masumoto')
    );
  });

  it('returns left if reducer function returns left', () => {
    const reducer = () => Left('dummy error');
    const initialValue = Right('');
    expect(eitherArrayReduce(arr, initialValue, reducer)).toStrictEqual(Left('dummy error'));
  });
});
