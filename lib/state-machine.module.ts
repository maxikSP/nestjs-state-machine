import { DynamicModule, Provider } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { StateMachineFactory } from '@lib/state-mechine.factory';
import { GraphInterface } from '@lib/interfaces/graph.interface';
import { STATE_MACHINE_GRAPHS } from '@lib/tokens';

export class StateMachineModule {
  public static forRoot(graphs: GraphInterface[]): DynamicModule {
    const graphsProvider: Provider = {
      provide: STATE_MACHINE_GRAPHS,
      useValue: graphs,
    };

    return {
      module: StateMachineModule,
      imports: [EventEmitterModule.forRoot({ wildcard: true })],
      providers: [graphsProvider, StateMachineFactory],
      exports: [StateMachineFactory],
    };
  }
}
