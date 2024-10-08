import { EnterStateEvent } from '@lib/events/enter-state.event';
import { OnEnterState } from '@lib/decorators/on-enter-state.decorator';
import { ProjectState, PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class EnterListener {
  @OnEnterState(PROJECT_SM_GRAPH, ProjectState.IN_PROGRESS)
  handle(event: EnterStateEvent<Project>) {
    event.subject.enter = true;
  }
}
