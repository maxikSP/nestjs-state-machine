## Description

Finite State Machine module for [Nest](https://github.com/nestjs/nest).

## Getting started

Install package:
```bash
$ npm i --save @rqb/nestjs-state-machine
```

For example, we will map the following state machine:

![example state machine](https://github.com/depthlabs-io/nestjs-state-machine/blob/main/example.jpg?raw=true)


After installation, import StateMachineModule into your root module with state machine graph configurations:
```typescript
// app.module.ts
import { StateMachineModule } from '@rqb/nestjs-state-machine';

@Module({
  imports: [
    // .forRoot takes array of graph configurations
    StateMachineModule.forRoot([
        {
            // Name of graph
            name: 'project-graph',
            // Initial state of graph
            initialState: 'new',
            // Available states in graph
            states: [
                'new',
                'in-progress',
                'done'
            ],
            // Available transitions in graph
            transitions: [
                {
                    // Name of transistion
                    name: 'start',
                    // Source states
                    from: ['new'],
                    // Target state of transition
                    to: 'in-progress',
                },
                {
                    name: 'finish',
                    from: ['in-progress'],
                    to: 'done',
                }
            ],
        },
    ]),
  ]
})
export class AppModule {}
```

It's good idea to define graph, state and transition names in one place e.g.:
```typescript
// constants.ts
export const PROJECT_GRAPH = 'project-graph'

export enum ProjectState {
    NEW = 'new',
    IN_PROGRESS = 'in-progress',
    DONE = 'done'
}

export enum ProjectTransition {
    START = 'start',
    FINISH = 'finish'
}

```

and then:

```typescript
import { StateMachineModule } from '@rqb/nestjs-state-machine';
import { PROJECT_GRAPH, ProjectState, ProjectTransition } from './constants';

// ...

StateMachineModule.forRoot([
    {
        name: PROJECT_GRAPH,
        initialState: ProjectState.NEW,
        states: [
            ProjectState.NEW,
            ProjectState.IN_PROGRESS,
            ProjectState.DONE
        ],
        transitions: [
            {
                name: ProjectTransition.START,
                from: [ProjectState.NEW],
                to: ProjectState.IN_PROGRESS,
            },
            {
                name: ProjectTransition.FINISH,
                from: [ProjectState.IN_PROGRESS],
                to: ProjectState.DONE,
            }
        ],
    }
]);
```

Next, create model or use your exisiting model and decorate property which will be responsible for storing state of model:
```typescript
// project.model.ts
import { StateStore } from '@rqb/nestjs-state-machine';
import { PROJECT_GRAPH, ProjectState } from './constants';

export class Project {
    name: string;

    @StateStore(PROJECT_GRAPH)
    state: string = ProjectState.NEW;

}
```
`@StateStore` takes one argument with graph name (string). Thanks to this one model can handle more then many graphs:
```typescript
@StateStore(PROJECT_GRAPH)
state: string = ProjectState.NEW;

@StateStore(PROJECT_STATUS_GRAPH)
status: string = ProjectStatusState.ACTIVE;
```

At this point we can create our state machine. First inject `StateMachineFactory` using standard constructor injection:


```typescript
import { StateMachineFactory } from '@rqb/nestjs-state-machine';

// ...

constructor(
    private readonly stateMachineFactory: StateMachineFactory,
) {}
```

Create state machine with instance of `Project` model as subject in first argument of factory and with graph name in second.
```typescript
const projectStateMachine = this.stateMachineFactory.create<Project>(project, PROJECT_GRAPH)
```

## State Machine methods

Apply transition:
```typescript
// takes transition name in argument
await projectStateMachine.apply(ProjectTransition.START)
// return void but project.state is now equal ProjectState.IN_PROGRESS
```

Check if transition is possible:
```typescript
// takes transition name in argument
await projectStateMachine.can(ProjectTransition.START)
// return true or false, can() don't throw Errors
```

Get all possible transitions:
```typescript
await projectStateMachine.getAvailableTransitions()
// return TransitionInterface[];
```

## Guards

You can create guards to block transitions.
To declare an `Guard`, decorate a method with the `@OnGuard()` decorator:

```typescript
import { GuardEvent, OnGuard } from '@rqb/nestjs-state-machine';
import { ProjectTransition, PROJECT_GRAPH } from '../constance';
import { Project } from '../project.model';

export class ProjectCantBeNamedBlockmeGuard {

    // Graph name in first argument, transition name in second
    @OnGuard(PROJECT_GRAPH, ProjectTransition.START)
    handle(event: GuardEvent<Project>) {
        // event.subject is our Project instance
        if (event.subject.name == 'blockme') { // if name isn't allowed for some reasons
            event.setBlocked('transition-blocked'); // block transition using setBlocked() method
        }
    }

}
```
Than you need to register `ProjectCantBeNamedBlockmeGuard` in module as provider:
```typescript
@Module({
    imports: [
        StateMachineModule.forRoot([
            // ...
        ])
    ],
    providers: [
        ProjectCantBeNamedBlockmeGuard
    ],
})
export class AppModule {}
```

Now, if you create `StateMachine` instance and try to apply `START` transition you will get:
```typescript
const project = new Project()
project.name = 'blockme'

const projectStateMachine = this.stateMachineFactory.create<Project>(project, PROJECT_GRAPH);

await projectStateMachine.can(ProjectTransition.START)
// false

await projectStateMachine.apply(ProjectTransition.START)
// Throw TransitionBlockedByGuardException with .blockingReasons property that contain ['transition-blocked']

projectStateMachine.getAvailableTransitions()
// [] - empty
```

## Transition Events

You can create transition event listeners to do additional actions when a state machine operation happened (e.g. sending emails, recalculate)

When a state transition is initiated, the events are dispatched in the following order:

| Order | Event | Decorator | Decorator second argument |
|-|-|-|-|
| 1 | LeaveState<br><small><small>(The subject is about to leave a place). | OnLeaveState | State name |
| 2 | BeginTransition<br><small>(The subject is going through this transition.)</small> | OnBeginTransition | Transition name |
| 3 | EnterState<br><small>(The subject is about to enter a new place. This event is triggered right before the subject places are updated.)</small> | OnEnterState | State name |
| 4 | -> Change of state
| 5 | EnteredState<br><small>(The subject has entered in the places and the marking is updated.)</small> | OnEnteredState | State name |
| 6 | CompletedTransition<br><small>(The object has completed this transition.)</small> | OnCompletedTransition | Transition name |
| 7 | AnnounceTransitions<br><small>(Triggered for each transition that now is accessible for the subject.)</small> | OnAnnounceTransitions | State name |


Example:
```typescript
import { OnCompletedTransition, CompletedTransitionEvent } from '@rqb/nestjs-state-machine';
import { ProjectTransition, PROJECT_GRAPH } from '../constance';
import { Project } from '../project.model';

export class NotifyTeamAboutFinishedTask {

    // Graph name in first argument, transition name in second. Third if truem method is async.
    @OnCompletedTransition(PROJECT_GRAPH, ProjectTransition.FINISH, true)
    async handle(event: CompletedTransitionEvent<Project>) {
        // Send emails to all users in team
    }

}
```
and of course:
```typescript
@Module({
    // ...
    providers: [
        NotifyTeamAboutFinishedTask
    ],
    // ...
})
export class AppModule {}
```


## License

Nestjs State Machine is [MIT licensed](LICENSE).
