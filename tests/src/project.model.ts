import { StateStore } from '@lib/decorators/state-store.decorator';

export class Project {
  public name: string = 'test project';

  @StateStore('project')
  public state: string = 'new';

  public leave: boolean = false;

  public transition: boolean = false;

  public enter: boolean = false;

  public entered: boolean = false;

  public completed: boolean = false;

  public announcedTransitionNames: string[] = [];
}
