import { Injectable } from '@angular/core';
import { getIDType } from '@datorama/akita';
import {
  HttpGetConfig,
  isID,
  NgEntityService,
  NgEntityServiceConfig,
} from '@datorama/akita-ng-entity-service';
import {
  Article,
  ArticleListResponse,
  ArticleResponse,
} from '@real-world/models';
import { Observable } from 'rxjs';
import { ArticleState, ArticleStore } from './article.store';

@NgEntityServiceConfig({
  resourceName: 'articles',
})
@Injectable({ providedIn: 'root' })
export class ArticleService extends NgEntityService<ArticleState> {
  constructor(protected store: ArticleStore) {
    super(store);
  }

  get(config?: HttpGetConfig<Article>): Observable<Article[]>;
  get(
    idOrConfig?: getIDType<ArticleState> | HttpGetConfig<Article>,
    config?: HttpGetConfig<Article>
  ): Observable<Article | Article[]> {
    const isSingle = isID(idOrConfig);

    if (isSingle) {
      const configMerged: HttpGetConfig<Article> = {
        mapResponseFn: (res: ArticleResponse) => {
          return res.article;
        },
        ...config,
      }
      return super.get(idOrConfig, configMerged);
    } else {
      const configMerged: HttpGetConfig<Article | Article[]> = {
        mapResponseFn: (res: ArticleListResponse) => {
          return res.articles;
        },
        ...config,
      }
      return super.get(configMerged);
    }
  }
}
