/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addEntities } from '@ngneat/elf-entities';
import { getRequestResult, trackRequestResult } from '@ngneat/elf-requests';
import { User, UserResponse } from '@real-world/models';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntityService } from '../state-management/entity.service';

@Injectable({ providedIn: 'root' })
export class UserDataService extends EntityService<
  User & { password?: string },
  'username'
> {
  private requestKeyLogin = [this.storeConfig.name, 'login'];

  selectLoginLoading() {
    return getRequestResult(this.requestKeyLogin).pipe(
      map((requestResult) => requestResult.isLoading)
    );
  }

  selectLoginLoaded() {
    return getRequestResult(this.requestKeyLogin).pipe(
      map((requestResult) => requestResult.isSuccess)
    );
  }

  selectLoginErrored() {
    return getRequestResult(this.requestKeyLogin).pipe(
      map((requestResult) => requestResult.isError)
    );
  }

  selectLoginError() {
    return getRequestResult(this.requestKeyLogin).pipe(
      map((requestResult) => requestResult.isError && requestResult.error)
    );
  }

  selectIsLoggedIn() {
    return this.selectAllEntities().pipe(map((users) => users.length > 0));
  }

  selectUser() {
    return this.selectAllEntities().pipe(
      map((users) => (users.length > 0 ? users[0] : undefined))
    );
  }

  constructor(private httpClient: HttpClient) {
    super({ name: 'user', idKey: 'username' });
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<UserResponse>(`${environment.api}/api/users/login`, {
        user: { email, password },
      })
      .pipe(
        map((response) => response.user),
        tap((user) => this.store.update(addEntities(user))),
        trackRequestResult(this.requestKeyLogin)
      );
  }

  protected override loadEntityRequest(id: string): Observable<User> {
    return this.httpClient
      .get<UserResponse>(`${environment.api}/api/user`)
      .pipe(map((response) => response.user));
  }

  protected override createEntityRequest(
    options: Partial<User>
  ): Observable<User> {
    return this.httpClient
      .post<UserResponse>(`${environment.api}/api/user`, { user: options })
      .pipe(map((response) => response.user));
  }

  protected override updateEntityRequest(
    id: string,
    options: Partial<User>
  ): Observable<User> {
    return this.httpClient
      .put<UserResponse>(`${environment.api}/api/user`, { user: options })
      .pipe(map((response) => response.user));
  }
}
