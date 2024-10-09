import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class CompletedTransitionEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'completed';
}
