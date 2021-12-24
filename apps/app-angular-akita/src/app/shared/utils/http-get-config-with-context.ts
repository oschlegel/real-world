import { HttpContext } from '@angular/common/http';
import { HttpGetConfig } from '@datorama/akita-ng-entity-service';

export type HttpGetConfigWithContext<T> = HttpGetConfig<T> & {
  context: HttpContext;
};
