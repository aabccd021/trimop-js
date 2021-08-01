import { Failure } from './failure';

/**
 * Value
 */
export type Value<V> = {
  readonly _tag: 'Value';
  readonly value: V;
};

export function Value<V>(value: V): Value<V> {
  return { _tag: 'Value', value };
}

/**
 * Failed
 */
export type Failed<F extends Failure> = {
  readonly _tag: 'Failed';
  readonly errorObject: Error;
  readonly failure: F;
};

export function Failed<F extends Failure>(failure: F): Failed<F> {
  return {
    _tag: 'Failed',
    errorObject: new Error(),
    failure,
  };
}

/**
 * Either
 */
export type Either<F extends Failure, V> = Failed<F> | Value<V>;
