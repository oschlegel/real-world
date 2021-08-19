import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagListResponse } from '@real-world/models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagDataService {

  constructor(private http: HttpClient) { }

  get():Observable<string[]> {
return this.http.get<TagListResponse>(`${environment.api}/api/tags`).pipe(map(response => response.tags));
  }
}
