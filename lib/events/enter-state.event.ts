import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class EnterStateEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'enter';

  public getName(): string {
    return `${this.baseEventName}.${this.graph.name}.${this.eventType}.${this.transition.to}`;
  }
}
