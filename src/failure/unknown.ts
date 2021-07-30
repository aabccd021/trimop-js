import { Failure } from './failure';

export type UnknownFailure = Failure & {
  readonly failureType: 'UnknownFailure';
  readonly unknown: unknown;
};

export function UnknownFailure(unknown: unknown): UnknownFailure {
  return {
    failureType: 'UnknownFailure',
    unknown,
  };
}
