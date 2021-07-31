import { Failure } from './failure';

export type UnknownFailure = Failure & {
  readonly _failureType: 'UnknownFailure';
  readonly unknown: unknown;
};

export function UnknownFailure(unknown: unknown): UnknownFailure {
  return {
    _failureType: 'UnknownFailure',
    unknown,
  };
}
