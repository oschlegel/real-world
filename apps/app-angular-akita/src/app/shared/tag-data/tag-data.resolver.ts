import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TagDataService } from './tag-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagDataResolver implements Resolve<string[]> {
  constructor(private tagDataService: TagDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.tagDataService.get()
  }
}
