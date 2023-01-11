import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagListResponse } from '@real-world/models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntityService } from '../state-management/entity.service';

interface Tag {
  id: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagDataService extends EntityService<Tag> {
  constructor(private httpClient: HttpClient) {
    super({ name: 'tag' });
  }

  override loadAllEntitiesRequest(): Observable<Tag[]> {
    return this.httpClient
      .get<TagListResponse>(`${environment.api}/api/tags`)
      .pipe(
        map((response) => response.tags),
        map((tags) => tags.map((tag) => ({ id: tag, value: tag })))
      );
  }
}
