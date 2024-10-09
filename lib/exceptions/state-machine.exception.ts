import { GraphInterface } from '@lib/interfaces/graph.interface';
import { TransitionInterface } from '@lib/interfaces/transition.interface';

export class StateMachineException<T> extends Error {
  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
    readonly fromState?: string,
    readonly transition?: TransitionInterface,
    message?: string,
  ) {
    super(message);
  }
}
