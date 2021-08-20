import { _ } from './function';
import { None, Option, Some } from './type';

/**
 *
 * @param value
 * @returns
 */
export function some<S>(value: S): Some<S> {
  return { _tag: 'Some', value };
}

/**
 *
 */
export const none: None = { _tag: 'None' };

/**
 *
 */
export type Fn<S, T> = (e: Option<S>) => T;

/**
 *
 * @param onNone
 * @param onSome
 * @returns
 */
export function fold<S, T>(onNone: () => T, onSome: (s: S) => T): Fn<S, T> {
  return (o) => (o._tag === 'None' ? onNone() : onSome(o.value));
}

/**
 *
 * @param f
 * @returns
 */
export function map<S, T>(f: (s: S) => T): Fn<S, Option<T>> {
  return fold<S, Option<T>>(
    () => none,
    (s) => some(f(s))
  );
}

/**
 *
 * @param f
 * @returns
 */
export function chain<T, S>(f: (s: S) => Option<T>): Fn<S, Option<T>> {
  return (o) =>
    _(o)
      ._(map(f))
      ._(
        fold(
          () => none,
          (v) => v
        )
      )
      ._v();
}

/**
 *
 * @param f
 * @returns
 */
export function chain2<T, S>(f: (s: S) => Option<Option<T>>): Fn<S, Option<T>> {
  return (o) =>
    _(o)
      ._(chain(f))
      ._(
        fold(
          () => none,
          (v) => v
        )
      )
      ._v();
}

/**
 *
 * @param f
 * @returns
 */
export function getOrElse<S>(f: () => S): Fn<S, S> {
  return fold(f, (s) => s);
}
