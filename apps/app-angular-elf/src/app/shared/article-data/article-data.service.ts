import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../state-management/entity.service';
import {
  Article,
  ArticleListResponse,
  ArticleResponse,
} from '@real-world/models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GetArticleListOptions {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleDataService extends EntityService<
  Article,
  'slug',
  GetArticleListOptions
> {
  constructor(private httpClient: HttpClient) {
    super({ name: 'article', idKey: 'slug' });
  }

  protected override loadEntityRequest(id: string): Observable<Article> {
    return this.httpClient
      .get<ArticleResponse>(`${environment.api}/api/articles/${id}`)
      .pipe(map((response) => response.article));
  }

  protected override loadManyEntitiesRequest(
    options: GetArticleListOptions
  ): Observable<Article[]> {
    const query = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.httpClient
      .get<ArticleListResponse>(`${environment.api}/api/articles?${query}`)
      .pipe(map((response) => response.articles));
  }
}
