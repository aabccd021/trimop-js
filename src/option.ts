/**
 * None
 */
export type None = {
  readonly _tag: 'None';
};

/**
 * Some
 */
export type Some<T> = {
  readonly _tag: 'Some';
  readonly value: T;
};

/**
 * Option
 */
export type Option<T> = None | Some<T>;

/**
 *
 * @returns
 */
export function None(): None {
  return { _tag: 'None' };
}

/**
 *
 * @param value
 * @returns
 */
export function Some<T>(value: NonNullable<T>): Some<T> {
  return { _tag: 'Some', value };
}

/**
 *
 * @param option
 * @returns
 */
export function isNone(option: Option<unknown>): option is None {
  return option._tag === 'None';
}

/**
 *
 * @param option
 * @returns
 */
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option._tag === 'Some';
}

/**
 *
 * @param nullable
 * @returns
 */
export function optionFromNullable<T>(nullable: NonNullable<T> | undefined | null): Option<T> {
  // eslint-disable-next-line no-null/no-null
  if (nullable === undefined || nullable === null) {
    return None();
  }
  return Some(nullable);
}

/**
 *
 * @param option
 * @param mapIfNone
 * @param mapIfSome
 * @returns
 */
export function optionFold<TResult, T>(
  option: Option<T>,
  mapIfNone: () => NonNullable<TResult>,
  mapIfSome: (value: T) => NonNullable<TResult>
): TResult {
  return isNone(option) ? mapIfNone() : mapIfSome(option.value);
}

/**
 *
 * @param either
 * @param mapper
 * @returns
 */
export function optionMapSome<TResult, T>(
  option: Option<T>,
  mapper: (value: T) => NonNullable<TResult>
): Option<TResult> {
  return isNone(option) ? option : Some(mapper(option.value));
}

/**
 *
 * @param optionArr
 * @returns
 */
export function optionArrayMapSome<T>(optionArr: readonly Option<T>[]): readonly T[] {
  return optionArr.filter(isSome).map(({ value }) => value);
}
