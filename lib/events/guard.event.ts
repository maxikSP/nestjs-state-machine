import { GenericStateMachineEvent } from '@lib/events/generic-state-machine.event';

export class GuardEvent<T> extends GenericStateMachineEvent<T> {
  protected readonly eventType: string = 'guard';

  private readonly blockingReasons: string[] = [];
  private blocked: boolean = false;

  public setBlocked(reason?: string): void {
    this.blocked = true;

    if (reason) {
      this.blockingReasons.push(reason);
    }
  }

  public isBlocked(): boolean {
    return this.blocked;
  }

  public getBlockingReasons(): string[] {
    return this.blockingReasons;
  }
}
