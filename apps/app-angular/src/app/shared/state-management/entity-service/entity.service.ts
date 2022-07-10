import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EntityState } from '../entity-store/enitity-state';
import { EntityId } from '../entity-store/entity-id';
import { AddOrUpdateEntities } from '../entity-store/entity-state-mutations';
import { setProperty } from '../store/mutations';
import { Store } from '../store/store';
import { EntityServiceConfiguration } from './entity-service-configuration';

export abstract class EntityService<
  Entity,
  Id extends EntityId,
  State extends EntityState<Entity, Id>
> {
  protected store: Store<State>;
  protected httpClient: HttpClient;

  constructor(
    initialState: State,
    private configuration: EntityServiceConfiguration<Entity, Id>
  ) {
    this.store = new Store<State>(initialState);
    this.httpClient = inject(HttpClient);
  }

  loadAll(): void {
    if (
      this.store.snapshot().select((state) => state.loadingAll) ||
      this.store.snapshot().select((state) => state.loadedAll)
    ) {
      return;
    }

    this.store.update(setProperty('loadingAll', true));

    this.httpClient
      .get<Entity[]>(this.configuration.url)
      .pipe(
        map((response) =>
          this.configuration.loadAll?.transformResponse
            ? this.configuration.loadAll?.transformResponse(response)
            : response
        )
      )
      .subscribe({
        next: (response) =>
          this.store.update(
            AddOrUpdateEntities(
              response.map((entity) =>
                this.configuration.buildEntityId(entity)
              ),
              response
            ),
            setProperty('loadingAll', false),
            setProperty('loadedAll', true)
          ),
        error: (error) =>
          this.store.update(
            setProperty('loadingAll', false),
            setProperty('loadingAllError', error)
          ),
      });
  }

  getEntities(): Observable<Entity[]> {
    return this.store.select((state) =>
      state.ids.map((id) => state.entities[id])
    );
  }

  getLoadingAll(): Observable<boolean> {
    return this.store.select((state) => state.loadingAll);
  }

  getLoadingAllError(): Observable<unknown> {
    return this.store.select((state) => state.loadingAllError);
  }

  getLoadedAll(): Observable<boolean> {
    return this.store.select((state) => state.loadedAll);
  }
}
