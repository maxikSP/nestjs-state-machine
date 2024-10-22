import { GuardEvent } from '@lib/events/guard.event';
import { OnGuard } from '@lib/decorators/on-guard.decorator';
import { PROJECT_SM_GRAPH, ProjectTransition } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class BlockingGuard {
  @OnGuard(PROJECT_SM_GRAPH, ProjectTransition.START)
  handle(event: GuardEvent<Project>) {
    event.context.processed = true;

    if (event.subject.name == 'blockme') {
      event.setBlocked('transition-blocked');
    }
  }
}
