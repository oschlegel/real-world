import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FooterModule } from './shared/footer/footer.module';
import { HeaderModule } from './shared/header/header.module';
import { PageLoaderModule } from './shared/page-loader/page-loader.module';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpCacheInterceptorModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
    HeaderModule,
    FooterModule,
    PageLoaderModule,
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: `${environment.api}/api` },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
