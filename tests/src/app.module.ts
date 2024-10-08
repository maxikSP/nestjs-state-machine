import { Module } from '@nestjs/common';
import { StateMachineModule } from '@lib/state-machine.module';
import { LeaveListener } from '@tests/src/callbacks/leave.listener';
import { TransitionListener } from '@tests/src/callbacks/transition.listener';
import { EnterListener } from '@tests/src/callbacks/enter.listener';

import { BlockingGuard } from '@tests/src/guards/blocking.guard';
import { EnteredListener } from '@tests/src/callbacks/entered.listener';
import { CompletedListener } from '@tests/src/callbacks/completed.listener';
import { AnnounceListener } from '@tests/src/callbacks/announce.listener';

@Module({
  imports: [
    StateMachineModule.forRoot([
      {
        name: 'project',
        initialState: 'new',
        states: ['new', 'in-progress', 'done', 'archived'],
        transitions: [
          {
            name: 'start',
            from: ['new'],
            to: 'in-progress',
          },
          {
            name: 'finish',
            from: ['new', 'in-progress'],
            to: 'done',
          },
          {
            name: 'archive',
            from: ['done'],
            to: 'archived',
          },
        ],
      },
    ]),
  ],
  providers: [
    BlockingGuard,
    LeaveListener,
    TransitionListener,
    EnterListener,
    EnteredListener,
    CompletedListener,
    AnnounceListener,
  ],
})
export class AppModule {}
