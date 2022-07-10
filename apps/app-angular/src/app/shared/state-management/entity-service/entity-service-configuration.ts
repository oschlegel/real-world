import { EntityId } from '../entity-store/entity-id';

export interface EntityServiceConfiguration<Entity,Id extends EntityId> {
  url: string;
  buildEntityId: (entity: Entity) => Id;
  loadAll?: EntityServiceOperationConfiguration<Entity[]>
}

export interface EntityServiceOperationConfiguration<ResponseTransformed> {
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformResponse?: (response: any) => ResponseTransformed;
}
