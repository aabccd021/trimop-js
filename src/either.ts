import { Failure } from './failure';

/**
 * Value
 */
export type Value<V> = {
  readonly _tag: 'value';
  readonly value: V;
};

export function Value<V>(value: V): Value<V> {
  return { _tag: 'value', value };
}

/**
 * Failed
 */
export type Failed<F extends Failure> = {
  readonly _tag: 'failed';
  readonly errorObject?: Error;
  readonly failure: F;
};

export function Failed<F extends Failure>(failure: F): Failed<F> {
  return {
    _tag: 'failed',
    errorObject: process.env['FP_LITE_TEST'] === 'true' ? undefined : new Error(),
    failure,
  };
}

/**
 * Either
 */
export type Either<F extends Failure, V> = Failed<F> | Value<V>;
