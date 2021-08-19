import * as E from './either';
import { _ } from './function';
import { Either, Tuple2, Tuple3 } from './type';

/**
 *
 */
export function compact2<E, A, B>([a, b]: Tuple2<Either<E, A>, Either<E, B>>): Either<
  E,
  Tuple2<A, B>
> {
  return _(a)
    ._(
      E.map((a) =>
        _(b)
          ._(E.map((b) => [a, b] as Tuple2<A, B>))
          ._v()
      )
    )
    ._v();
  // return E.isRight(a) ? (E.isRight(b) ? E.right([a.right, b.right]) : b) : a;
}

/**
 *
 */
export function compact3<E, A, B, C>([a, b, c]: Tuple3<
  Either<E, A>,
  Either<E, B>,
  Either<E, C>
>): Either<E, Tuple3<A, B, C>> {
  const x = _(a)
    ._(
      E.map((a) =>
        _([b, c] as Tuple2<Either<E, B>, Either<E, C>>)
          ._(compact2)
          ._(E.map(([b, c]) => [a, b, c]))
          ._v()
      )
    )
    ._(E.flatten)
    ._v();
  // const x = compact2([b, c]);
  // E.isRight(a) ? (E.isRight(x) ? E.right([a.right, ...x.right]) : x) : a;
}
