import { Component, OnInit } from '@angular/core';
import { Article } from '@real-world/models';
import { Observable, of } from 'rxjs';
import { TagDataService } from '../../shared/tag-data/tag-data.service';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]> = of([]);
  articlesLoaded$ = of(false);
  tags$ = this.tagDataService.selectAllEntities();
  tagsLoaded$ = this.tagDataService.selectAllEntitiesLoaded();

  constructor(private tagDataService: TagDataService) {}

  ngOnInit() {
    this.tagDataService.loadAllEntities().subscribe();
  }
}
