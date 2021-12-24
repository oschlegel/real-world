import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Article } from '@real-world/models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ArticleState extends EntityState<Article> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'article', idKey: 'slug' })
export class ArticleStore extends EntityStore<ArticleState> {
  constructor() {
    super();
  }
}
