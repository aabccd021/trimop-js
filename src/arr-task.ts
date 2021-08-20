import { Arr, Task } from './type';

/**
 *
 */
export type Fn<T, TResult> = (arrTask: Arr<Task<T>>) => TResult;

/**
 *
 * @param arrOfTask
 * @returns
 */
export function parallel<T>(arrOfTask: Arr<Task<T>>): Task<Arr<T>> {
  return () => Promise.all(arrOfTask.map((task) => task()));
}
