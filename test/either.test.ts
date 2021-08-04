import {
  Either,
  eitherArray,
  eitherArrayFilter,
  eitherArrayMap,
  eitherArrayReduce,
  eitherMapRight,
  isLeft,
  isRight,
  left,
  right,
} from '../src';

describe('either', () => {
  describe('isRight', () => {
    it('returns true if given right', () => {
      const either = right('kira');
      expect(isRight(either)).toStrictEqual(true);
    });

    it('returns false if given left', () => {
      const either = left('masumoto');
      expect(isRight(either)).toStrictEqual(false);
    });
  });

  describe('isLeft', () => {
    it('returns true if given left', () => {
      const either = left('masumoto');
      expect(isLeft(either)).toStrictEqual(true);
    });

    it('returns false if given right', () => {
      const either = right('kira');
      expect(isLeft(either)).toStrictEqual(false);
    });
  });

  describe('eitherMapRight', () => {
    const mapper = (value: string) => right(`name is ${value}`);
    it('returns left if given left', () => {
      const either = left('invalid name error');
      expect(eitherMapRight(either, mapper)).toStrictEqual(left('invalid name error'));
    });

    it('returns mapped right if given right', () => {
      const either = right('kira');
      expect(eitherMapRight(either, mapper)).toStrictEqual(right('name is kira'));
    });
  });

  describe('eitherArray', () => {
    it('returns right array if there is no left in array', () => {
      const arr: Either<number, string>[] = [right('kira'), right('masumoto')];
      expect(eitherArray(arr)).toStrictEqual(right(['kira', 'masumoto']));
    });

    it('returns left if there is a left in array', () => {
      const arr: Either<number, string>[] = [right('kira'), left(404), right('masumoto')];
      expect(eitherArray(arr)).toStrictEqual(left(404));
    });
  });

  describe('eitherArrayFilter', () => {
    const arr: string[] = ['kira', 'masumoto'];
    it('returns filtered array if filter function returns right', () => {
      const filter = (t: string) => right(t.length > 5);
      expect(eitherArrayFilter(arr, filter)).toStrictEqual(right(['masumoto']));
    });

    it('returns left if filter function returns left', () => {
      const filter = () => left('dummy error');
      expect(eitherArrayFilter(arr, filter)).toStrictEqual(left('dummy error'));
    });
  });

  describe('eitherArrayMap', () => {
    const arr: number[] = [21, 46];
    it('returns mapped array if mapper function returns right', () => {
      const mapper = (t: number) => right(t * 2);
      expect(eitherArrayMap(arr, mapper)).toStrictEqual(right([42, 92]));
    });

    it('returns left if mapper function returns left', () => {
      const mapper = () => left('dummy error');
      expect(eitherArrayMap(arr, mapper)).toStrictEqual(left('dummy error'));
    });
  });

  describe('eitherArrayReduce', () => {
    const arr: string[] = ['kira', 'masumoto'];
    it('returns reduced if reducer function returns right', () => {
      const reducer = (acc: string, t: string) => right(`${acc} ${t}`);
      const initialValue = right('my name is');
      expect(eitherArrayReduce(arr, initialValue, reducer)).toStrictEqual(
        right('my name is kira masumoto')
      );
    });

    it('returns left if reducer function returns left', () => {
      const reducer = () => left('dummy error');
      const initialValue = right('');
      expect(eitherArrayReduce(arr, initialValue, reducer)).toStrictEqual(left('dummy error'));
    });
  });
});
