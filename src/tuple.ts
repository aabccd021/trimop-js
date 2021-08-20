import { Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 * @param f
 * @returns
 */
export function map2<A, B, C>(f: (a: A, b: B) => C): (tuple: Tuple2<A, B>) => C {
  return (tuple) => f(...tuple);
}

export function map3<A, B, C, D>(f: (a: A, b: B, c: C) => D): (tuple: Tuple3<A, B, C>) => D {
  return (tuple) => f(...tuple);
}

export function map4<A, B, C, D, E>(
  f: (a: A, b: B, c: C, d: D) => E
): (tuple: Tuple4<A, B, C, D>) => E {
  return (tuple) => f(...tuple);
}

export function bind2<A, B>(f: (b: A) => B): (t: A) => Tuple2<A, B> {
  return (b) => [b, f(b)];
}

export function bind3<A, B, C>(f: (a: A, b: B) => C): (t: Tuple2<A, B>) => Tuple3<A, B, C> {
  return (t) => [...t, f(...t)];
}

export function bind4<A, B, C, D>(
  f: (a: A, b: B, c: C) => D
): (t: Tuple3<A, B, C>) => Tuple4<A, B, C, D> {
  return (t) => [...t, f(...t)];
}
