import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile, ProfileResponse } from '@real-world/models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntityService } from '../state-management/entity.service';

@Injectable({ providedIn: 'root' })
export class ProfileDataService extends EntityService<Profile, 'username'> {
  constructor(private httpClient: HttpClient) {
    super({ name: 'profile', idKey: 'username' });
  }

  protected override loadEntityRequest(id: string): Observable<Profile> {
    return this.httpClient
      .get<ProfileResponse>(`${environment.api}/api/profiles/${id}`)
      .pipe(map((response) => response.profile));
  }

  protected override updateEntityRequest(
    id: string,
    options: Partial<Profile>
  ): Observable<Profile> {
    if (options.following === true) {
      return this.httpClient
        .post<ProfileResponse>(
          `${environment.api}/api/profiles/${id}/follow`,
          {}
        )
        .pipe(map((response) => response.profile));
    }
    if (options.following === false) {
      return this.httpClient
        .delete<ProfileResponse>(`${environment.api}/api/profiles/${id}/follow`)
        .pipe(map((response) => response.profile));
    }
    throw new Error('Not implemented');
  }
}
