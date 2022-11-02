import { inject, Injectable } from '@angular/core';
import { EntityService } from '../state-management/entity.service';
import { TagDataRequestService } from './tag-data-request.service';

interface Tag {
  id: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagDataService extends EntityService<Tag> {
  constructor() {
    super({ name: 'tag' }, inject(TagDataRequestService));
  }
}
