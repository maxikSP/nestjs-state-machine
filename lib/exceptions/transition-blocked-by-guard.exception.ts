import { GraphInterface } from '@lib/interfaces/graph.interface';
import { TransitionInterface } from '@lib/interfaces/transition.interface';
import { StateMachineException } from '@lib/exceptions/state-machine.exception';

export class TransitionBlockedByGuardException<
  T,
> extends StateMachineException<T> {
  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
    readonly fromState: string,
    readonly transition: TransitionInterface,
    readonly blockingReasons: string[],
  ) {
    super(
      subject,
      graph,
      fromState,
      transition,
      'Transition blocked by guard. Reasons: ' + blockingReasons.toString(),
    );
  }
}
