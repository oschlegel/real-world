import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';
import { ArticleStore, ArticleState } from './article.store';

@Injectable({ providedIn: 'root' })
export class ArticleQuery extends QueryEntity<ArticleState> {
  loaders = this.loader.loadersFor(this.store.storeName);

  constructor(protected store: ArticleStore,private loader: NgEntityServiceLoader) {
    super(store);
  }

}
