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

export type Flow<TPar, TInit> = {
  readonly _: <TRet>(mapper: (t: TPar) => TRet) => Flow<TRet, TInit>;
  readonly _v: (p: TInit) => TPar;
};

export function flow<TEnd, TInit>(mapper: (t: TInit) => TEnd): Flow<TEnd, TInit> {
  return {
    _: (nextMapper) => flow((z) => nextMapper(mapper(z))),
    _v: mapper,
  };
}
