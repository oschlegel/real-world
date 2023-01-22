import { Injectable } from '@angular/core';
import { Comment } from '@real-world/models';
import { EntityService } from '../state-management/entity.service';

@Injectable({ providedIn: 'root' })
export class ArticleCommentDataService extends EntityService<Comment> {
  constructor() {
    super({ name: 'articleComment' });
  }
}
