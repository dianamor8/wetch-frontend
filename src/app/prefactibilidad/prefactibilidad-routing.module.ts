import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { RedirectToLoginGuard } from '../auth/guard/redirect-to-login.guard';
import { AcabadoListComponent } from './components/Acabado/acabado-list/acabado-list.component';
import { AmbienteAddComponent } from './components/Ambiente/ambiente-add/ambiente-add.component';
import { AmbienteDetailComponent } from './components/Ambiente/ambiente-detail/ambiente-detail.component';
import { AmbienteListComponent } from './components/Ambiente/ambiente-list/ambiente-list.component';
import { AreaViviendaComponent } from './components/AreaVivienda/area-vivienda.component';
import { TipoAreaViviendaDetailComponent } from './components/TipoAreaVivienda/tipo-area-vivienda-detail/tipo-area-vivienda-detail.component';
import { TipoAreaViviendaListComponent } from './components/TipoAreaVivienda/tipo-area-vivienda-list/tipo-area-vivienda-list.component';


const routes: Routes = [
  // { path: 'areaVivienda', component: AreaViviendaComponent, canActivate:[RedirectToLoginGuard] },
  { path: 'tipo-area-vivienda', component: TipoAreaViviendaListComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'tipoAreaVivienda.all'}},
  // { path: 'tipo-area-vivienda/:id', component: TipoAreaViviendaDetailComponent, canActivate:[RedirectToLoginGuard]}, //OJO
  { path: 'ambiente-list', component: AmbienteListComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'ambiente.all'} },
  { path: 'ambiente/:id', component: AmbienteDetailComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'ambiente.edit'}},
  { path: 'ambiente-new', component: AmbienteAddComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'ambiente.create'}},
  { path: 'acabado-list', component: AcabadoListComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'acabado.all'} },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefactibilidadRoutingModule { }
