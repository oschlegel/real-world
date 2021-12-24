import { Injectable } from '@angular/core';
import { getEntityType, getIDType } from '@datorama/akita';
import {
  HttpAddConfig,
  HttpDeleteConfig,
  HttpGetConfig,
  HttpUpdateConfig,
  isID,
  NgEntityService,
  NgEntityServiceConfig,
} from '@datorama/akita-ng-entity-service';
import { CacheBucket, HttpCacheManager, withCache } from '@ngneat/cashew';
import {
  Article,
  ArticleListResponse,
  ArticleResponse,
} from '@real-world/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpGetConfigWithContext } from '../utils';
import { ArticleState, ArticleStore } from './article.store';

@NgEntityServiceConfig({
  resourceName: 'articles',
})
@Injectable({ providedIn: 'root' })
export class ArticleService extends NgEntityService<ArticleState> {
  private cacheBucket = new CacheBucket();

  constructor(
    protected store: ArticleStore,
    private cacheManager: HttpCacheManager
  ) {
    super(store);
  }

  get<T>(config?: HttpGetConfig<T>): Observable<T[]>;
  get<T>(
    idOrConfig?: getIDType<ArticleState> | HttpGetConfig<T>,
    config?: HttpGetConfig<T>
  ): Observable<T | T[]> {
    const isSingle = isID(idOrConfig);

    const configMerged: HttpGetConfigWithContext<T> = {
      context: withCache({ bucket: this.cacheBucket }),
      mapResponseFn: (res: ArticleResponse | ArticleListResponse) => {
        return ('article' in res ? res.article : res.articles) as unknown as T;
      },
      ...config,
    };

    return isSingle
      ? super.get(idOrConfig, configMerged)
      : super.get(configMerged);
  }

  add<T>(
    entity: getEntityType<ArticleState>,
    config?: HttpAddConfig<T>
  ): Observable<T> {
    return super
      .add(entity, {
        ...config,
        mapResponseFn: (res: ArticleResponse) => res.article as unknown as T,
      })
      .pipe(tap(() => this.cacheManager.delete(this.cacheBucket)));
  }

  update<T>(
    id: getIDType<ArticleState>,
    entity: Partial<getEntityType<ArticleState>>,
    config?: HttpUpdateConfig<T>
  ): Observable<T> {
    return super
      .update(id, entity, {
        ...config,
        mapResponseFn: (res: ArticleResponse) => res.article as unknown as T,
      })
      .pipe(tap(() => this.cacheManager.delete(this.cacheBucket)));
  }

  delete<T>(
    id: getIDType<ArticleState>,
    config?: HttpDeleteConfig<T>
  ): Observable<T> {
    return super
      .delete(id, config)
      .pipe(tap(() => this.cacheManager.delete(this.cacheBucket)));
  }
}
