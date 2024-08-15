import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaskinComponent } from './laskin/laskin.component';
import { Laskin2Component } from './laskin2/laskin2.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-laskin', pathMatch: 'full' },
  { path: 'app-laskin', component: LaskinComponent },
  { path: 'app-laskin2', component: Laskin2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
