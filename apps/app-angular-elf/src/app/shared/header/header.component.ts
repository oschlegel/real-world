import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'rw-header',
  templateUrl: './header.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isLoggedIn$ = this.userDataService.selectIsLoggedIn();
  user$ = this.userDataService.selectUser();

  constructor(private userDataService: UserDataService) {}
}
