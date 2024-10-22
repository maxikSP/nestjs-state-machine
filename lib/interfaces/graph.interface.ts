import { TransitionInterface } from '@lib/interfaces/transition.interface';

export interface GraphInterface {
  name: string;
  initialState: string;
  states: string[];
  transitions: TransitionInterface[];
}
