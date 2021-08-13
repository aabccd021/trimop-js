/**
 * Right
 */
export type Right<T> = {
  readonly _tag: 'Right';
  readonly right: T;
};

/**
 * Left
 */
export type Left<E> = {
  readonly _tag: 'Left';
  readonly errorObject: Error;
  readonly left: E;
};

/**
 * Either
 * TODO: Result<Ok, Err>
 */
export type Either<F, V> = Left<F> | Right<V>;

/**
 *
 * @param right
 * @returns
 */
export function Right<T>(right: T): Right<T> {
  return { _tag: 'Right', right };
}

/**
 *
 * @param left
 * @returns
 */
export function Left<F>(left: F): Left<F> {
  return {
    _tag: 'Left',
    errorObject: new Error(),
    left,
  };
}

/**
 *
 * @param either
 * @returns
 */
export function isRight<T>(either: Either<unknown, T>): either is Right<T> {
  return either._tag === 'Right';
}

/**
 *
 * @param either
 * @returns
 */
export function isLeft<E>(either: Either<E, unknown>): either is Left<E> {
  return either._tag === 'Left';
}

/**
 *
 * @param either
 * @param mapper
 * @returns
 */
export function eitherFlatten<E, T>(either: Either<E, Either<E, T>>): Either<E, T> {
  return isLeft(either) ? either : either.right;
}

/**
 *
 * @param either
 * @param mapper
 * @returns
 */
export function eitherMapRight<TResult, E, T>(
  either: Either<E, T>,
  mapper: (right: T) => TResult
): Either<E, TResult> {
  return isLeft(either) ? either : Right(mapper(either.right));
}

/**
 * TODO: eitherMatch
 * @param either
 * @param mapper
 * @returns
 */
export function eitherFold<TResult, E = unknown, T = unknown>(
  either: Either<E, T>,
  onLeft: (left: E) => TResult,
  onRight: (right: T) => TResult
): TResult {
  return isLeft(either) ? onLeft(either.left) : onRight(either.right);
}

/**
 *
 * @param arr
 * @returns
 */
export function eitherArray<E, T>(arr: readonly Either<E, T>[]): Either<E, readonly T[]> {
  return arr.reduce<Either<E, readonly T[]>>(
    (acc, el) =>
      eitherFlatten(eitherMapRight(acc, (acc) => eitherMapRight(el, (el) => [...acc, el]))),
    Right([])
  );
}

/**
 *
 * @param arr
 * @param filter
 * @returns
 */
export function eitherArrayFilter<E, T>(
  arr: readonly T[],
  filter: (t: T) => Either<E, boolean>
): Either<E, readonly T[]> {
  return arr.reduce<Either<E, readonly T[]>>(
    (acc, el) =>
      eitherFlatten(
        eitherMapRight(acc, (acc) =>
          eitherMapRight(filter(el), (isEqual) => (isEqual ? [...acc, el] : acc))
        )
      ),
    Right([])
  );
}

/**
 *
 * @param arr
 * @param mapper
 * @returns
 */
export function eitherArrayMap<TResult, E, T>(
  arr: readonly T[],
  mapper: (t: T) => Either<E, TResult>
): Either<E, readonly TResult[]> {
  return arr.reduce<Either<E, readonly TResult[]>>(
    (acc, el) =>
      eitherFlatten(
        eitherMapRight(acc, (acc) => eitherMapRight(mapper(el), (mapped) => [...acc, mapped]))
      ),
    Right([])
  );
}

/**
 *
 * @param arr
 * @param reducer
 * @param initialValue
 * @returns
 */
export function eitherArrayReduce<TResult, E, T>(
  arr: readonly T[],
  initialValue: Either<E, TResult>,
  reducer: (acc: TResult, el: T) => Either<E, TResult>
): Either<E, TResult> {
  return arr.reduce<Either<E, TResult>>(
    (acc, el) => eitherFlatten(eitherMapRight(acc, (acc) => reducer(acc, el))),
    initialValue
  );
}
