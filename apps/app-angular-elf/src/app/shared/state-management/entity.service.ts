import { createStore, StoreConfig } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  selectEntity,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { getRequestResult, trackRequestResult } from '@ngneat/elf-requests';
import { map, Observable, tap } from 'rxjs';

export abstract class EntityService<
  EntityType extends { [P in IdKey]: PropertyKey },
  IdKey extends string = 'id'
> {
  protected store = createStore(
    this.storeConfig,
    withEntities<EntityType, IdKey>()
  );

  protected requestKeyCreateEntity = [this.storeConfig.name, 'create'];
  protected requestKeyLoadAllEntities = [this.storeConfig.name, 'load', 'all'];
  protected requestKeyLoadEntity = (id: EntityType[IdKey]) => [
    this.storeConfig.name,
    'load',
    id,
  ];
  protected requestKeyUpdateEntity = (id: EntityType[IdKey]) => [
    this.storeConfig.name,
    'update',
    id,
  ];
  protected requestKeyDeleteEntity = (id: EntityType[IdKey]) => [
    this.storeConfig.name,
    'delete',
    id,
  ];

  constructor(protected storeConfig: StoreConfig) {}

  selectCreateEntityLoading() {
    return getRequestResult(this.requestKeyCreateEntity).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectCreateEntityLoaded() {
    return getRequestResult(this.requestKeyCreateEntity).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectCreateEntityErrored() {
    return getRequestResult(this.requestKeyCreateEntity).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectCreateEntityError() {
    return getRequestResult(this.requestKeyCreateEntity).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  selectUpdateEntityLoading(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyUpdateEntity(id)).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectUpdateEntityLoaded(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyUpdateEntity(id)).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectUpdateEntityErrored(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyUpdateEntity(id)).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectUpdateEntityError(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyUpdateEntity(id)).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  selectDeleteEntityLoading(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyDeleteEntity(id)).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectDeleteEntityLoaded(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyDeleteEntity(id)).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectDeleteEntityErrored(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyDeleteEntity(id)).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectDeleteEntityError(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyDeleteEntity(id)).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  selectAllEntities() {
    return this.store.pipe(selectAllEntities());
  }

  selectAllEntitiesLoading() {
    return getRequestResult(this.requestKeyLoadAllEntities).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectAllEntitiesLoaded() {
    return getRequestResult(this.requestKeyLoadAllEntities).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectAllEntitiesErrored() {
    return getRequestResult(this.requestKeyLoadAllEntities).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectAllEntitiesError() {
    return getRequestResult(this.requestKeyLoadAllEntities).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  selectEntity(id: EntityType[IdKey]) {
    return this.store.pipe(selectEntity(id));
  }

  selectEntityLoading(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyLoadEntity(id)).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectEntityLoaded(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyLoadEntity(id)).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectEntityErrored(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyLoadEntity(id)).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectEntityError(id: EntityType[IdKey]) {
    return getRequestResult(this.requestKeyLoadEntity(id)).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  createEntity(options: Partial<EntityType>) {
    return this.createEntityRequest(options).pipe(
      tap((entity) => this.store.update(addEntities(entity))),
      trackRequestResult(this.requestKeyCreateEntity, { skipCache: true })
    );
  }

  protected createEntityRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: Partial<EntityType>
  ): Observable<EntityType> {
    throw new Error('Method not implemented.');
  }

  updateEntity(id: EntityType[IdKey], options: Partial<EntityType>) {
    return this.updateAllEntityRequest(id, options).pipe(
      tap((entity) => this.store.update(upsertEntities(entity))),
      trackRequestResult(this.requestKeyUpdateEntity(id), { skipCache: true })
    );
  }

  protected updateAllEntityRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: EntityType[IdKey],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: Partial<EntityType>
  ): Observable<EntityType> {
    throw new Error('Method not implemented.');
  }

  deleteEntity(id: EntityType[IdKey]) {
    return this.deleteEntityRequest(id).pipe(
      tap(() => this.store.update(deleteEntities(id))),
      trackRequestResult(this.requestKeyDeleteEntity(id), { skipCache: true })
    );
  }

  protected deleteEntityRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: EntityType[IdKey]
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }

  loadAllEntities() {
    return this.loadAllEntitiesRequest().pipe(
      tap((entities) => this.store.update(addEntities(entities))),
      trackRequestResult(this.requestKeyLoadAllEntities)
    );
  }

  protected loadAllEntitiesRequest(): Observable<EntityType[]> {
    throw new Error('Method not implemented.');
  }

  loadEntity(id: EntityType[IdKey]) {
    return this.loadEntityRequest(id).pipe(
      tap((entity) => this.store.update(addEntities(entity))),
      trackRequestResult(this.requestKeyLoadEntity(id))
    );
  }

  protected loadEntityRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: EntityType[IdKey]
  ): Observable<EntityType> {
    throw new Error('Method not implemented.');
  }
}
