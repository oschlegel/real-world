import { Selector } from './selector';

export class StoreSnapshot<State> {
  constructor(
    private state: State
  ) {}

  select<Selection>(selector: Selector<State, Selection>): Selection {
    return selector(this.state);
  }
}
