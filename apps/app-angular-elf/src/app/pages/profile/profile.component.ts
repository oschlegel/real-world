import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDataService } from '../../shared/profile-data/profile-data.service';

@Component({
  selector: 'rw-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  username = this.route.snapshot.params['username'];
  profile$ = this.profileDataService.selectEntity(this.username);
  profileLoaded$ = this.profileDataService.selectEntityLoaded(this.username);

  constructor(
    private profileDataService: ProfileDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profileDataService.loadEntity(this.username).subscribe();
  }
}
