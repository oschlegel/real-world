import { BehaviorSubject, map, Observable } from 'rxjs';
import { Mutation } from './mutation';
import { Selector } from './selector';
import { StoreSnapshot } from './store-snapshot';

export class Store<State> extends BehaviorSubject<State> {
  constructor(private initialState: State) {
    super(initialState);
  }

  reset(): void {
    this.next(this.initialState);
  }

  select<Selection>(selector: Selector<State, Selection>): Observable<Selection> {
    return this.pipe(map(selector));
  }

  snapshot(): StoreSnapshot<State> {
    return new StoreSnapshot<State>(this.value);
  }

  update(...mutations: Mutation<State>[]): void {
    let state = this.value;
    mutations.forEach((mutation) => {
      state = { ...state, ...(mutation instanceof Function ? mutation(state) : mutation) };
    })
    this.next(state);
  }
}
