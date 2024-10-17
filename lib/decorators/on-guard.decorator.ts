import { SetMetadata } from '@nestjs/common';
import { OnEventMetadata } from '@nestjs/event-emitter';
import { EVENT_LISTENER_METADATA } from '@nestjs/event-emitter/dist/constants';

export const OnGuard = (
  graphName: string = '*',
  transitionName: string = '*',
): MethodDecorator =>
  SetMetadata(EVENT_LISTENER_METADATA, {
    event: `state-machine.${graphName}.guard.${transitionName}`,
  } as OnEventMetadata);
