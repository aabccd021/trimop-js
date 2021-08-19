import { _ } from './function';
import * as O from './option';
import * as P from './tuple';
import { Either, Left, Option, Right, Tuple2, Tuple3, Tuple4 } from './type';

function _isLeft<L, R>(e: Either<L, R>): e is Left<L> {
  return e._tag === 'Left';
}

/**
 *
 */
export function right<R>(right: R): Right<R> {
  return { _tag: 'Right', right };
}

/**
 *
 */
export function left<L>(left: L): Left<L> {
  return {
    _tag: 'Left',
    errorObject: new Error(),
    left,
  };
}

/**
 *
 */
export type Fn<L, R, T> = (e: Either<L, R>) => T;

/**
 *
 */
export function flatten<L, R>(e: Either<L, Either<L, R>>): Either<L, R> {
  return _isLeft(e) ? e : e.right;
}

/**
 *
 */
export function map<B, A, AResult>(f: (a: A) => AResult): Fn<B, A, Either<B, AResult>> {
  return (either) => (_isLeft(either) ? either : right(f(either.right)));
}

/**
 *
 */
export function mapLeft<B, A, BResult>(f: (l: B) => BResult): Fn<B, A, Either<BResult, A>> {
  return (either) =>
    _isLeft(either)
      ? { _tag: 'Left', errorObject: either.errorObject, left: f(either.left) }
      : either;
}

/**
 *
 */
export function fold<L, R, T>(onLeft: (e: L) => T, onRight: (a: R) => T): Fn<L, R, T> {
  return (e) => (_isLeft(e) ? onLeft(e.left) : onRight(e.right));
}

/**
 *
 */
export function getOrElse<B, A>(mapper: (l: B) => A): Fn<B, A, A> {
  return fold(mapper, (r) => r);
}

/**
 *
 */
export function toOption<B, A>(): Fn<B, A, Option<A>> {
  return fold(
    () => O.none() as Option<A>,
    (r) => O.some(r)
  );
}

/**
 *
 */
export function chain<AResult, B, A>(
  f: (a: A) => Either<B, AResult>
): Fn<B, A, Either<B, AResult>> {
  return (e) => _(e)._(map(f))._(flatten)._v();
}

/**
 *
 */
export function map2<T, E, A, B>(f: (a: A, b: B) => T): Fn<E, Tuple2<A, B>, Either<E, T>> {
  return map(P.map2(f));
}

/**
 *
 */
export function map3<T, E, A, B, C>(
  f: (a: A, b: B, c: C) => T
): Fn<E, Tuple3<A, B, C>, Either<E, T>> {
  return map(P.map3(f));
}

/**
 *
 */
export function map4<T, E, A, B, C, D>(
  f: (a: A, b: B, c: C, d: D) => T
): Fn<E, Tuple4<A, B, C, D>, Either<E, T>> {
  return map(P.map4(f));
}
