import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class LeaveStateEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'leave';

  public getName(): string {
    return `${this.baseEventName}.${this.graph.name}.${this.eventType}.${this.fromState}`;
  }
}
