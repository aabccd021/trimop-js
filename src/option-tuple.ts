import { _ } from './function';
import * as O from './option';
import * as P from './tuple';
import { Option, Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 * @param f
 * @returns
 */
export function map2<A, B, T>(f: (a: A, b: B) => T): (op: Option<Tuple2<A, B>>) => Option<T> {
  return (op) =>
    _(op)
      ._(O.map((val) => _(val)._(P.map2(f))._v()))
      ._v();
}

/**
 *
 * @param f
 * @returns
 */
export function map3<A, B, C, T>(
  f: (a: A, b: B, c: C) => T
): (op: Option<Tuple3<A, B, C>>) => Option<T> {
  return (op) =>
    _(op)
      ._(O.map((val) => _(val)._(P.map3(f))._v()))
      ._v();
}

/**
 *
 * @param f
 * @returns
 */
export function map4<A, B, C, D, T>(
  f: (a: A, b: B, c: C, d: D) => T
): (op: Option<Tuple4<A, B, C, D>>) => Option<T> {
  return (op) =>
    _(op)
      ._(O.map((val) => _(val)._(P.map4(f))._v()))
      ._v();
}
