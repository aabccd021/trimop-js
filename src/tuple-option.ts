import { _ } from './function';
import * as O from './option';
import * as P from './tuple';
import { Option, Tuple2, Tuple3, Tuple4 } from './type';

export function compact2<A, B>(t: Tuple2<Option<A>, Option<B>>): Option<Tuple2<A, B>> {
  return _(t[1])
    ._(
      O.chain((prev) =>
        _(t[0])
          ._(O.map(P.bind2(() => prev)))
          ._v()
      )
    )
    ._v();
}

export function compact3<A, B, C>(
  t: Tuple3<Option<A>, Option<B>, Option<C>>
): Option<Tuple3<A, B, C>> {
  return _(t[2])
    ._(
      O.chain((prev) =>
        _(P.tuple2(t[0], t[1]))
          ._(compact2)
          ._(O.map(P.bind3(() => prev)))
          ._v()
      )
    )
    ._v();
}

export function compact4<A, B, C, D>(
  t: Tuple4<Option<A>, Option<B>, Option<C>, Option<D>>
): Option<Tuple4<A, B, C, D>> {
  return _(t[3])
    ._(
      O.chain((prev) =>
        _(P.tuple3(t[0], t[1], t[2]))
          ._(compact3)
          ._(O.map(P.bind4(() => prev)))
          ._v()
      )
    )
    ._v();
}
