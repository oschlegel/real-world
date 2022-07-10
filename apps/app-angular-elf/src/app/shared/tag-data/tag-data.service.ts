import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagListResponse } from '@real-world/models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { createStore } from '@ngneat/elf';
import { withEntities, setEntities, selectAllEntities } from '@ngneat/elf-entities';
import {createRequestDataSource, withRequestsStatus,selectRequestStatus} from '@ngneat/elf-requests';

interface Tag {
  id: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagDataService {
  private readonly store = createStore({ name: 'tag' }, withEntities<Tag>(),withRequestsStatus());

  private readonly todosDataSource = createRequestDataSource({
    data$: () => this.store.pipe(selectAllEntities()),
    requestKey: 'todos',
    dataKey: 'todos',
    store: this.store,
  });

  tags$ = this.store.pipe(selectAllEntities());
  tagsLoaded$ = this.store.pipe(selectRequestStatus('todos'),map((status)=>status.value==='success'));

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<TagListResponse>(`${environment.api}/api/tags`).pipe(
      map((response) => response.tags),
      map((tags) => tags.map((tag) => ({ id: tag, value: tag }))),
      tap((tags) => this.store.update(setEntities(tags),this.todosDataSource.setSuccess()))
    );
  }
}
