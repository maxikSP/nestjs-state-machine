import { GraphInterface } from '@lib/interfaces/graph.interface';
import { TransitionInterface } from '@lib/interfaces/transition.interface';

export abstract class GenericStateMachineEvent<T> {
  protected readonly baseEventName: string = 'state-machine';

  protected readonly eventType: string = '*';

  constructor(
    readonly subject: T,
    readonly graph: GraphInterface,
    readonly context: any,
    readonly fromState: string,
    readonly transition: TransitionInterface,
  ) {}

  public getName(): string {
    return `${this.baseEventName}.${this.graph.name}.${this.eventType}.${this.transition.name}`;
  }
}
