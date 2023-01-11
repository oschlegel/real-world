import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../state-management/entity.service';
import { Article, ArticleResponse } from '@real-world/models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleDataService extends EntityService<Article, 'slug'> {
  constructor(private httpClient: HttpClient) {
    super({ name: 'article' });
  }

  protected override loadEntityRequest(id: string): Observable<Article> {
    return this.httpClient
      .get<ArticleResponse>(`${environment.api}/api/articles/${id}`)
      .pipe(map((response) => response.article));
  }
}
