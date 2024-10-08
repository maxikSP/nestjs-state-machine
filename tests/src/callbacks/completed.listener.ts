import { CompletedTransitionEvent } from '@lib/events/completed-transition.event';
import { OnCompletedTransition } from '@lib/decorators/on-completed-transition.decorator';
import { ProjectTransition, PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class CompletedListener {
  @OnCompletedTransition(PROJECT_SM_GRAPH, ProjectTransition.START)
  handle(event: CompletedTransitionEvent<Project>) {
    event.subject.completed = true;
  }
}
