import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class EnteredStateEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'entered';

  public getName(): string {
    return `${this.baseEventName}.${this.graph.name}.${this.eventType}.${this.transition.to}`;
  }
}
