/* eslint-disable import/exports-last */

export type Pipe<T> = {
  readonly _: <TResult>(mapper: (t: T) => TResult) => Pipe<TResult>;
  readonly _v: () => T;
};

export function _<T>(t: T): Pipe<T> {
  return {
    _: (mapper) => _(mapper(t)),
    _v: () => t,
  };
}

export type Flow<TPrev, TInit> = {
  readonly _: <TNext>(mapper: (t: TPrev) => TNext) => Flow<TNext, TInit>;
  readonly _val: () => (p: TInit) => TPrev;
};

export function flow<TEnd, TInit>(mapper: (t: TInit) => TEnd): Flow<TEnd, TInit> {
  return {
    _: (nextMapper) => flow((z) => nextMapper(mapper(z))),
    _val: () => mapper,
  };
}
