import * as E from './either';
import { _ } from './function';
import { Either, Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 */
export function compact2<E, A, B>([a, b]: Tuple2<Either<E, A>, Either<E, B>>): Either<
  E,
  Tuple2<A, B>
> {
  return _(a)
    ._(
      E.chain((a) =>
        _(b)
          ._(E.map((b) => [a, b] as Tuple2<A, B>))
          ._v()
      )
    )
    ._v();
}

/**
 *
 */
export function compact3<E, A, B, C>([a, b, c]: Tuple3<
  Either<E, A>,
  Either<E, B>,
  Either<E, C>
>): Either<E, Tuple3<A, B, C>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(compact2([b, c]))
          ._(E.map(([b, c]) => [a, b, c] as Tuple3<A, B, C>))
          ._v()
      )
    )
    ._v();
}

/**
 *
 */
export function compact4<E, A, B, C, D>([a, b, c, d]: Tuple4<
  Either<E, A>,
  Either<E, B>,
  Either<E, C>,
  Either<E, D>
>): Either<E, Tuple4<A, B, C, D>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(compact3([b, c, d]))
          ._(E.map(([b, c, d]) => [a, b, c, d] as Tuple4<A, B, C, D>))
          ._v()
      )
    )
    ._v();
}
