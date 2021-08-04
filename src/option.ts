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
export function none(): None {
  return { _tag: 'None' };
}

/**
 *
 * @param value
 * @returns
 */
export function some<T>(value: T): Some<T> {
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
    return none();
  }
  return some(nullable);
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
  mapIfNone: () => TResult,
  mapIfSome: (value: T) => TResult
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
  mapper: (value: T) => Option<TResult>
): Option<TResult> {
  return isNone(option) ? option : mapper(option.value);
}
