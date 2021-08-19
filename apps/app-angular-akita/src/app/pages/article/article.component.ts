import { Component, OnInit } from '@angular/core';
import { ArticleQuery, ArticleService } from '../../shared/state/article';

@Component({
  selector: 'rw-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  articles$ = this.articleQuery.selectAll();

  constructor(
    private articleService: ArticleService,
    private articleQuery: ArticleQuery
  ) {}

  ngOnInit(): void {
    this.articleQuery.loaders.get$.subscribe((loading) => {
      console.log('loading', loading);
    });

    this.articles$.subscribe((articles) => {
      console.log('articles', articles);
    });

    this.articleService.get().subscribe();
    this.articleService.get().subscribe();
  }
}
