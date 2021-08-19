import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rw-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tags: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeData = this.route.snapshot.data;
    this.tags = routeData.tags;
  }
}
