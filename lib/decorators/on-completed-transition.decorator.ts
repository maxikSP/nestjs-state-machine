import { SetMetadata } from '@nestjs/common';
import { OnEventMetadata } from '@nestjs/event-emitter';
import { EVENT_LISTENER_METADATA } from '@nestjs/event-emitter/dist/constants';

export const OnCompletedTransition = (
  graphName: string = '*',
  state: string = '*',
  async: boolean = false,
): MethodDecorator =>
  SetMetadata(EVENT_LISTENER_METADATA, {
    event: `state-machine.${graphName}.completed.${state}`,
    options: { async },
  } as OnEventMetadata);
