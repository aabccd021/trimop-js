/**
 * Right
 */
export type Right<T> = {
  readonly _tag: 'Right';
  readonly right: T;
};

export function right<T>(right: T): Right<T> {
  return { _tag: 'Right', right };
}

/**
 * Left
 */
export type Left<E> = {
  readonly _tag: 'Left';
  readonly errorObject: Error;
  readonly left: E;
};

export function left<F>(left: F): Left<F> {
  return {
    _tag: 'Left',
    errorObject: new Error(),
    left,
  };
}

/**
 * Either
 */
export type Either<F, V> = Left<F> | Right<V>;

/**
 *
 * @param either
 * @returns
 */
export function isRight<T>(either: Either<unknown, T>): either is Right<T> {
  return either._tag === 'Right';
}

export function isLeft<E>(either: Either<E, unknown>): either is Left<E> {
  return either._tag === 'Left';
}

/**
 *
 * @param either
 * @param mapper
 * @returns
 */
export function eitherMapRight<TResult, F, T>(
  either: Either<F, T>,
  mapper: (value: T) => Either<F, TResult>
): Either<F, TResult> {
  return either._tag === 'Left' ? either : mapper(either.right);
}

/**
 *
 * @param arr
 * @param mapper
 * @param initialValue
 * @returns
 */
export function eitherArrayReduce<TResult, E, T>(
  arr: readonly Either<E, T>[],
  initialValue: Either<E, TResult>,
  mapper: (acc: TResult, value: T, key: string) => Either<E, TResult>
): Either<E, TResult> {
  return Object.entries(arr).reduce<Either<E, TResult>>(
    (acc, [entryKey, entryValue]) =>
      eitherMapRight(acc, (acc) =>
        eitherMapRight(entryValue, (entryValue) => mapper(acc, entryValue, entryKey))
      ),
    initialValue
  );
}

/**
 *
 * @param arr
 * @param mapper
 * @returns
 */
export function eitherArrayFilter<E, T>(
  arr: readonly Either<E, T>[],
  mapper: (t: T) => Either<E, boolean>
): Either<E, readonly T[]> {
  return arr.reduce<Either<E, readonly T[]>>(
    (acc, el) =>
      eitherMapRight(acc, (acc) =>
        eitherMapRight(el, (el) =>
          eitherMapRight(mapper(el), (isEqual) => right(isEqual ? [...acc, el] : acc))
        )
      ),
    right([])
  );
}

/**
 *
 * @param arr
 * @param mapper
 * @returns
 */
export function eitherArrayMap<TResult, E, T>(
  arr: readonly Either<E, T>[],
  mapper: (t: T) => Either<E, TResult>
): Either<E, readonly TResult[]> {
  return arr.reduce<Either<E, readonly TResult[]>>(
    (acc, el) =>
      eitherMapRight(acc, (acc) =>
        eitherMapRight(el, (el) => eitherMapRight(mapper(el), (mapped) => right([...acc, mapped])))
      ),
    right([])
  );
}
