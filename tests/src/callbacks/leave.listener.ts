import { LeaveStateEvent } from '@lib/events/leave-state.event';
import { OnLeaveState } from '@lib/decorators/on-leave-state.decorator';
import { ProjectState, PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class LeaveListener {
  @OnLeaveState(PROJECT_SM_GRAPH, ProjectState.NEW)
  handle(event: LeaveStateEvent<Project>) {
    event.subject.leave = true;
  }
}
