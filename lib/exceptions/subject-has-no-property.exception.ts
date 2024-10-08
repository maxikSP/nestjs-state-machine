import { GraphInterface } from '@lib/interfaces/graph.interface';
import { StateMachineException } from '@lib/exceptions/state-machine.exception';

export class SubjectHasNoPropertyException<T> extends StateMachineException<T> {
  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
  ) {
    super(
      subject,
      graph,
      undefined,
      undefined,
      'State Machine Subject has no property',
    );
  }
}
