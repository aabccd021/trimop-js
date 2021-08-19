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
export type Fn<T, L, R> = (e: Either<L, R>) => T;

/**
 *
 */
export function flatten<L, R>(e: Either<L, Either<L, R>>): Either<L, R> {
  return _isLeft(e) ? e : e.right;
}

/**
 *
 */
export function map<AResult, B, A>(f: (a: A) => AResult): Fn<Either<B, AResult>, B, A> {
  return (either) => (_isLeft(either) ? either : right(f(either.right)));
}

/**
 *
 */
export function mapLeft<BResult, B, A>(f: (l: B) => BResult): Fn<Either<BResult, A>, B, A> {
  return (either) =>
    _isLeft(either)
      ? { _tag: 'Left', errorObject: either.errorObject, left: f(either.left) }
      : either;
}

/**
 *
 */
export function fold<T, L, R>(onLeft: (e: L) => T, onRight: (a: R) => T): Fn<T, L, R> {
  return (e) => (_isLeft(e) ? onLeft(e.left) : onRight(e.right));
}

/**
 *
 */
export function getOrElse<B, A>(mapper: (l: B) => A): Fn<A, B, A> {
  return fold(mapper, (r) => r);
}

/**
 *
 */
export function toOption<B, A>(): Fn<Option<A>, B, A> {
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
): Fn<Either<B, AResult>, B, A> {
  return (either) => _(either)._(map(f))._(flatten)._v();
}

/**
 *
 */
export function map2<T, E, A, B>(f: (a: A, b: B) => T): Fn<Either<E, T>, E, Tuple2<A, B>> {
  return map(P.map2(f));
}

/**
 *
 */
export function map3<T, E, A, B, C>(
  f: (a: A, b: B, c: C) => T
): Fn<Either<E, T>, E, Tuple3<A, B, C>> {
  return map(P.map3(f));
}

/**
 *
 */
export function map4<T, E, A, B, C, D>(
  f: (a: A, b: B, c: C, d: D) => T
): Fn<Either<E, T>, E, Tuple4<A, B, C, D>> {
  return map(P.map4(f));
}
