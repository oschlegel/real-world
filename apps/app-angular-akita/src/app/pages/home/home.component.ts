import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleQuery, ArticleService } from '../../shared/article-data';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  articles$ = this.articleQuery.selectAll();

  tags: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private articleQuery: ArticleQuery
  ) {}

  ngOnInit(): void {
    const routeData = this.route.snapshot.data;
    this.tags = routeData.tags;

    this.articleService.get().subscribe();
  }
}
