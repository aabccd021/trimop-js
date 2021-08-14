// eslint-disable-next-line functional/prefer-type-literal
export interface Dict<T> {
  readonly [index: string]: NonNullable<T>;
}
