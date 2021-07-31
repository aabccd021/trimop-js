import { Either, Failed, foldValue, UnknownFailure, Value } from '../src';

describe('foldValue', () => {
  it('return Failed if given Failed', () => {
    const mockedHandleValue = jest.fn<Either<UnknownFailure, string>, [number]>();
    const foldResult = foldValue<string, UnknownFailure, number>(
      Failed(UnknownFailure('dorokatsu')),
      mockedHandleValue
    );
    expect(foldResult).toStrictEqual(Failed(UnknownFailure('dorokatsu')));
    expect(mockedHandleValue).not.toHaveBeenCalled();
  });

  it('runs folded function if given Value', () => {
    const mockedHandleValue = jest
      .fn<Either<UnknownFailure, string>, [number]>()
      .mockReturnValue(Value('kira'));
    const foldResult = foldValue<string, UnknownFailure, number>(Value(46), mockedHandleValue);
    expect(foldResult).toStrictEqual(Value('kira'));
    expect(mockedHandleValue).toHaveBeenCalledTimes(1);
    expect(mockedHandleValue).toHaveBeenNthCalledWith(1, 46);
  });
});
