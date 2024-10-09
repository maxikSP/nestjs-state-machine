import { GraphInterface } from '@lib/interfaces/graph.interface';
import { TransitionInterface } from '@lib/interfaces/transition.interface';
import { StateMachineException } from '@lib/exceptions/state-machine.exception';

export class TransitionCantBeAppliedException<
  T,
> extends StateMachineException<T> {
  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
    readonly fromState: string,
    readonly transition: TransitionInterface,
  ) {
    super(
      subject,
      graph,
      fromState,
      transition,
      "Transition can't be applied: " + transition.name,
    );
  }
}
