import { BeginTransitionEvent } from '@lib/events/begin-transition.event';
import { OnBeginTransition } from '@lib/decorators/on-begin-transition.decorator';
import { ProjectTransition, PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class TransitionListener {
  @OnBeginTransition(PROJECT_SM_GRAPH, ProjectTransition.START)
  handle(event: BeginTransitionEvent<Project>) {
    event.subject.transition = true;
  }
}
