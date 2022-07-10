import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'rw-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoaderComponent implements OnInit {
  active$ = this.router.events.pipe(filter(event => event instanceof NavigationStart||event instanceof NavigationEnd||event instanceof NavigationError),map(event => event instanceof NavigationStart));

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
