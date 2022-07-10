import { Injectable } from '@angular/core';
import { Article, ArticleListResponse } from '@real-world/models';
import { environment } from '../../../environments/environment';
import {
  EntityState,
  getInitialEntityState
} from '../state-management';
import { EntityService } from '../state-management/entity-service/entity.service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ArticleState extends EntityState<Article, string> {}

@Injectable({ providedIn: 'root' })
export class ArticleDataService extends EntityService<
  Article,
  string,
  ArticleState
> {
  constructor() {
    super(getInitialEntityState(), {
      url: `${environment.api}/api/articles`,
      buildEntityId: (article: Article) => article.slug,
      loadAll: {
        transformResponse: (response: ArticleListResponse) => response.articles,
      },
    });
  }
}
