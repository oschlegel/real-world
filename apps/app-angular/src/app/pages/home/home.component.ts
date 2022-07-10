import { Component, OnInit } from '@angular/core';
import { ArticleDataService } from '../../shared/article-data/article-data.service';
import { TagDataService } from '../../shared/tag-data/tag-data.service';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  articles$ = this.articleDataService.getEntities();
  articlesLoaded$ = this.articleDataService.getLoadedAll();
  tags$ = this.tagDataService.getEntities();
  tagsLoaded$ = this.tagDataService.getLoadedAll();

constructor(private articleDataService: ArticleDataService,private tagDataService: TagDataService) {}

  ngOnInit() {
    this.articleDataService.loadAll();
    this.tagDataService.loadAll();
  }
}
