import { Either, left, foldValue, UnknownFailure, right } from '../src';

describe('foldValue', () => {
  it('return Failed if given Failed', () => {
    const mockedHandleValue = jest.fn<Either<UnknownFailure, string>, [number]>();
    const foldResult = foldValue<string, UnknownFailure, number>(
      left(UnknownFailure('dorokatsu')),
      mockedHandleValue
    );
    expect(foldResult).toStrictEqual(left(UnknownFailure('dorokatsu')));
    expect(mockedHandleValue).not.toHaveBeenCalled();
  });

  it('runs folded function if given Value', () => {
    const mockedHandleValue = jest
      .fn<Either<UnknownFailure, string>, [number]>()
      .mockReturnValue(right('kira'));
    const foldResult = foldValue<string, UnknownFailure, number>(right(46), mockedHandleValue);
    expect(foldResult).toStrictEqual(right('kira'));
    expect(mockedHandleValue).toHaveBeenCalledTimes(1);
    expect(mockedHandleValue).toHaveBeenNthCalledWith(1, 46);
  });
});
