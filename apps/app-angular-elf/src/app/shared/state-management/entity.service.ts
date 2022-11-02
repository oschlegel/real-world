import { createStore, StoreConfig } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectEntity,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestsCacheOperator,
  createRequestsStatusOperator,
  selectRequestStatus,
  updateRequestCache,
  updateRequestStatus,
  withRequestsCache,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { map, tap } from 'rxjs';
import { EntityRequestService } from './entitiy-request.service';

export abstract class EntityService<
  EntityType extends { [P in IdKey]: PropertyKey },
  IdKey extends string = 'id'
> {
  protected store = createStore(
    this.storeConfig,
    withEntities<EntityType, IdKey>(),
    withRequestsCache(),
    withRequestsStatus()
  );

  protected skipWhileTodosCached = createRequestsCacheOperator(this.store);
  protected trackRequestsStatus = createRequestsStatusOperator(this.store);
  protected requestStatusKeyLoadAllEntities = `${this.storeConfig.name}-load-all`;
  protected requestStatusKeyLoadEntity = (id: EntityType[IdKey]) =>
    `${this.storeConfig.name}-load-${String(id)}`;

  constructor(
    protected storeConfig: StoreConfig,
    protected entityRequestService: EntityRequestService<EntityType, IdKey>
  ) {}

  selectAllEntities() {
    return this.store.pipe(selectAllEntities());
  }

  selectAllEntitiesLoading() {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadAllEntities),
      map((status) => status.value === 'pending')
    );
  }

  selectAllEntitiesLoaded() {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadAllEntities),
      map((status) => status.value === 'success')
    );
  }

  selectAllEntitiesErrored() {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadAllEntities),
      map((status) => status.value === 'error')
    );
  }

  selectAllEntitiesError() {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadAllEntities),
      map((status) => (status.value === 'error' ? status.error : null))
    );
  }

  selectEntity(id: EntityType[IdKey]) {
    return this.store.pipe(selectEntity(id));
  }

  selectEntityLoading(id: EntityType[IdKey]) {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadEntity(id)),
      map((status) => status.value === 'pending')
    );
  }

  selectEntityLoaded(id: EntityType[IdKey]) {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadEntity(id)),
      map((status) => status.value === 'success')
    );
  }

  selectEntityErrored(id: EntityType[IdKey]) {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadEntity(id)),
      map((status) => status.value === 'error')
    );
  }

  selectEntityError(id: EntityType[IdKey]) {
    return this.store.pipe(
      selectRequestStatus(this.requestStatusKeyLoadEntity(id)),
      map((status) => (status.value === 'error' ? status.error : null))
    );
  }

  loadAllEntities() {
    return this.entityRequestService.loadAllEntities().pipe(
      tap((entities) =>
        this.store.update(
          addEntities(entities),
          updateRequestCache(this.requestStatusKeyLoadAllEntities),
          updateRequestStatus(this.requestStatusKeyLoadAllEntities, 'success')
        )
      ),
      this.trackRequestsStatus(this.requestStatusKeyLoadAllEntities),
      this.skipWhileTodosCached(this.requestStatusKeyLoadAllEntities)
    );
  }

  loadEntity(id: EntityType[IdKey]) {
    return this.entityRequestService.loadEntity(id).pipe(
      tap((entity) =>
        this.store.update(
          addEntities(entity),
          updateRequestCache(this.requestStatusKeyLoadEntity(id)),
          updateRequestStatus(this.requestStatusKeyLoadEntity(id), 'success')
        )
      ),
      this.trackRequestsStatus(this.requestStatusKeyLoadEntity(id)),
      this.skipWhileTodosCached(this.requestStatusKeyLoadEntity(id))
    );
  }
}
