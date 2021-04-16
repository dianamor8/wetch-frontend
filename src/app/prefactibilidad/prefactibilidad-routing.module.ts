import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToLoginGuard } from '../auth/guard/redirect-to-login.guard';
import { AreaViviendaComponent } from './area-vivienda/area-vivienda.component';

const routes: Routes = [
  { path: 'areaVivienda', component: AreaViviendaComponent, canActivate:[RedirectToLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefactibilidadRoutingModule { }
