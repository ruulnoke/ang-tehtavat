import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginformComponent } from './loginform/loginform.component';
import { RegformComponent } from './regform/regform.component';
import { ReglistComponent } from './reglist/reglist.component';
import { loginGuard } from './login.guard';

// path: merkkijono, joka vastaa URLia selaimen osoitepalkissa
// component: komponentti, joka reititittimen tulisi luoda kun mennään tähän osoitteeseen
const routes: Routes = [
  { path: '', redirectTo: 'reglist', pathMatch: 'full' },
  { path: 'loginform', component: LoginformComponent },
  // ilmoittautumislomake (regform) on suojattu loginGuardilla
  { path: 'regform', component: RegformComponent, canActivate: [loginGuard] },
  { path: 'reglist', component: ReglistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
