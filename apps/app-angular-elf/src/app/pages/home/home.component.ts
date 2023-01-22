import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@real-world/models';
import { Observable, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import {
  ArticleDataService,
  GetArticleListOptions,
} from '../../shared/article-data/article-data.service';
import { TagDataService } from '../../shared/tag-data/tag-data.service';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  activeListOptions$ = new ReplaySubject<GetArticleListOptions>();
  activeTab$ = new ReplaySubject<string>();
  articles$ = new ReplaySubject<Article[]>();
  articlesLoaded$!: Observable<boolean>;
  destroy$ = new Subject<void>();
  tags$ = this.tagDataService.selectAllEntities();
  tagsLoaded$ = this.tagDataService.selectAllEntitiesLoaded();

  constructor(
    private route: ActivatedRoute,
    private articleDataService: ArticleDataService,
    private tagDataService: TagDataService
  ) {}

  ngOnInit() {
    this.tagDataService.loadAllEntities().subscribe();

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['tag']) {
          this.articlesLoaded$ =
            this.articleDataService.selectManyEntitiesLoaded({
              tag: params['tag'],
            });
          this.articleDataService
            .loadManyEntities({ tag: params['tag'] })
            .subscribe((articles) => this.articles$.next(articles));
          this.activeTab$.next('tag');
        } else if (params['feed'] === 'personal') {
          this.articles$.next([]);
          this.articlesLoaded$ = of(true);
          this.activeTab$.next('personal');
        } else if (params['feed'] === 'global' || !params['feed']) {
          this.articlesLoaded$ =
            this.articleDataService.selectManyEntitiesLoaded({});
          this.articleDataService
            .loadManyEntities({})
            .subscribe((articles) => this.articles$.next(articles));
          this.activeTab$.next('global');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
