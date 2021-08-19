import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TagDataResolver } from '../../shared/tag-data/tag-data.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent,resolve:{tags:TagDataResolver},runGuardsAndResolvers: 'paramsOrQueryParamsChange', }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
