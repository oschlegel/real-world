import { Injectable } from '@angular/core';
import { TagListResponse } from '@real-world/models';
import { environment } from '../../../environments/environment';
import { EntityService, EntityState, getInitialEntityState } from '../state-management';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TagState extends EntityState<string, string> {}

@Injectable({
  providedIn: 'root',
})
export class TagDataService extends EntityService<string, string, TagState> {
  constructor() {
    super(getInitialEntityState(), {
      url: `${environment.api}/api/tags`,
      buildEntityId: (tag: string) => tag,
      loadAll: {
        transformResponse: (response: TagListResponse) => response.tags,
      },
    });
  }

}
