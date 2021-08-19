/**
 *
 */
export type Right<A> = {
  readonly _tag: 'Right';
  readonly right: A;
};

/**
 *
 */
export type Left<E> = {
  readonly _tag: 'Left';
  readonly errorObject: Error;
  readonly left: E;
};

/**
 *
 */
export type Either<E, A> = Left<E> | Right<A>;

/**
 *
 */
export declare type None = {
  readonly _tag: 'None';
};

/**
 *
 */
export declare type Some<A> = {
  readonly _tag: 'Some';
  readonly value: A;
};

/**
 *
 */
export type Option<A> = None | Some<A>;

/**
 *
 */
export type Task<A> = () => Promise<A>;

/**
 *
 */
export type IO<A> = () => A;

/**
 *
 */
export type TaskEither<E, T> = Task<Either<E, T>>;

/**
 *
 */
export type Reader<R, A> = (r: R) => A;

// eslint-disable-next-line functional/prefer-type-literal
export interface Dict<V> {
  readonly [index: string]: NonNullable<V>;
}

export type Arr<A> = readonly A[];

/**
 *
 */
export type Tuple2<A, B> = readonly [A, B];

/**
 *
 */
export type Tuple3<A, B, C> = readonly [A, B, C];

/**
 *
 */
export type Tuple4<A, B, C, D> = readonly [A, B, C, D];
