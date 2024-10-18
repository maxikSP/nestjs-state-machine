import { EnteredStateEvent } from '@lib/events/entered-state.event';
import { OnEnteredState } from '@lib/decorators/on-entered-state.decorator';
import { ProjectState, PROJECT_SM_GRAPH } from '@tests/src/constance';
import { Project } from '@tests/src/project.model';

export class EnteredListener {
  @OnEnteredState(PROJECT_SM_GRAPH, ProjectState.IN_PROGRESS)
  handle(event: EnteredStateEvent<Project>) {
    event.subject.entered = true;
    event.context.processed = true;
  }
}
