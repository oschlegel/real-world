import { EntityId } from './entity-id';

export interface EntityState<Entity, Id extends EntityId> {
  activeId: Id | null;
  ids: Id[];
  entities: Record<Id, Entity>;
  loadingAll: boolean;
  loadingAllError: unknown;
  loadedAll: boolean;
  loading: Id[];
  loadingError: Record<Id, unknown>;
  loaded: Id[];
}

export function getInitialEntityState<Entity, Id extends EntityId>(): EntityState<Entity, Id> {
  return {
    activeId: null,
    ids: [],
    entities: {} as Record<Id, Entity>,
    loadingAll: false,
    loadingAllError: null,
    loadedAll: false,
    loading: [],
    loadingError: {} as Record<Id, Entity>,
    loaded: []
  };
}
