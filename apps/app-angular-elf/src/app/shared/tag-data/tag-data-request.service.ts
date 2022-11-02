import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityRequestService } from '../state-management/entitiy-request.service';
import { map, Observable } from 'rxjs';
import { TagListResponse } from '@real-world/models';
import { environment } from '../../../environments/environment';

interface Tag {
  id: string;
  value: string;
}

@Injectable({ providedIn: 'root' })
export class TagDataRequestService implements EntityRequestService<Tag> {
  constructor(private httpClient: HttpClient) {}

  loadAllEntities(): Observable<Tag[]> {
    return this.httpClient
      .get<TagListResponse>(`${environment.api}/api/tags`)
      .pipe(
        map((response) => response.tags),
        map((tags) => tags.map((tag) => ({ id: tag, value: tag })))
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadEntity(id: string): Observable<Tag> {
    throw new Error('Method not implemented.');
  }
}
