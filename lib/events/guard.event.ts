import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class GuardEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'guard';

  private blocked: boolean = false;

  private blockingReasons: Array<string> = [];

  public setBlocked(reason?: string) {
    this.blocked = true;
    if (reason) {
      this.blockingReasons.push(reason);
    }
  }

  public isBlocked(): boolean {
    return this.blocked;
  }

  public getBlockingReasons(): Array<string> {
    return this.blockingReasons;
  }
}
