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
