import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StateMachine } from '@lib/state-machine';
import { GraphInterface } from '@lib/interfaces/graph.interface';
import { SubjectHasNoPropertyException } from '@lib/exceptions/subject-has-no-property.exception';
import { STATE_MACHINE_GRAPHS, STATE_MACHINE_STORE } from '@lib/tokens';

@Injectable()
export class StateMachineFactory {
  constructor(
    @Inject(STATE_MACHINE_GRAPHS) private readonly graphs: GraphInterface[],
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2,
  ) {}

  public create<T extends object>(
    subject: T,
    graphName: string,
  ): StateMachine<T> {
    const graph: GraphInterface | undefined = this.graphs.find(
      (graph: GraphInterface): boolean => graph.name === graphName,
    );

    if (!graph) {
      throw new Error("Can't find graph with given name: " + graphName);
    }

    const statePropName: string | undefined =
      this.findPropertyNameOfSubjectWithGraphState(subject, graph);

    if (!statePropName) {
      throw new SubjectHasNoPropertyException(subject, graph);
    }

    return new StateMachine<T>(
      subject,
      graph,
      statePropName,
      this.eventEmitter,
    );
  }

  private findPropertyNameOfSubjectWithGraphState<T extends object>(
    subject: T,
    graph: GraphInterface,
  ): string | undefined {
    // Find property name for given graph
    return Object.getOwnPropertyNames(subject).find(
      (prop: string): boolean =>
        Reflect.getMetadata(STATE_MACHINE_STORE, subject, prop) === graph.name,
    );
  }
}
