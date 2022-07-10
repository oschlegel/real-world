import { Mutation } from '../store/mutation';
import { EntityState } from './enitity-state';
import { EntityId } from './entity-id';

export function AddOrUpdateEntity<
  Entity,
  Id extends EntityId,
  State extends EntityState<Entity, Id>
>(id: Id, entity: Entity): Mutation<State> {
  return (state) => {
    const newState = { ...state };
    if (newState.ids.indexOf(id) === -1) {
      newState.ids.push(id);
    }
    newState.entities[id] =
      typeof entity === 'object'
        ? { ...newState.entities[id], ...entity }
        : entity;
    return newState;
  };
}

export function AddOrUpdateEntities<
  Entity,
  Id extends EntityId,
  State extends EntityState<Entity, Id>
>(ids: Id[], entities: Entity[]): Mutation<State> {
  return (state) => {
    let newState = { ...state };
    ids.forEach((id, i) => {
      newState = {
        ...newState,
        ...AddOrUpdateEntity(id, entities[i])(newState),
      };
    });
    return newState;
  };
}
