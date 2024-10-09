import { TransitionInterface } from '@lib/interfaces/transition.interface';

export interface GraphInterface {
  name: string;
  initialState: string;
  states: Array<string>;
  transitions: TransitionInterface[];
}
