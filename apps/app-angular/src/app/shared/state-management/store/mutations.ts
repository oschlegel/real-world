import { Mutation } from './mutation';

export function setProperty<
  State,
  Property extends keyof State
>(property: Property, value: State[Property]): Mutation<State> {
  return (state: State) => ({ ...state, [property]: value });
}
