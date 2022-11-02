import { Observable } from 'rxjs';

export interface EntityRequestService<
  EntityType extends { [P in IdKey]: PropertyKey },
  IdKey extends string = 'id'
> {
  loadAllEntities(): Observable<EntityType[]>;
  loadEntity(id: EntityType[IdKey]): Observable<EntityType>;
}
