import { GraphInterface } from '@lib/interfaces/graph.interface';
import { StateMachineException } from '@lib/exceptions/state-machine.exception';

export class TransitionNotFoundException<T> extends StateMachineException<T> {
  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
    readonly missingTransitionName: string,
  ) {
    super(
      subject,
      graph,
      undefined,
      undefined,
      'Transition not found: ' + missingTransitionName,
    );
  }
}
