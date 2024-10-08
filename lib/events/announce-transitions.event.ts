import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class AnnounceTransitionsEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'announce';
}
