import { LeaveStateEvent } from '@lib/events/leave-state.event';
import { OnAnnounceTransitions } from '@lib/decorators/on-announce-transitions.decorator';
import { PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class AnnounceListener {
  @OnAnnounceTransitions(PROJECT_SM_GRAPH)
  handle(event: LeaveStateEvent<Project>) {
    event.subject.announcedTransitionNames.push(event.transition.name);
  }
}
