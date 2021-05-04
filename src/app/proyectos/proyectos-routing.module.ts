import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToLoginGuard } from '../auth/guard/redirect-to-login.guard';
import { ProyectoAddComponent } from './components/Proyecto/proyecto-add/proyecto-add.component';
import { ProyectoDetailComponent } from './components/Proyecto/proyecto-detail/proyecto-detail.component';
import { ProyectoListComponent } from './components/Proyecto/proyecto-list/proyecto-list.component';

const routes: Routes = [  
  { path: 'proyectos-list', component: ProyectoListComponent, canActivate:[RedirectToLoginGuard] },
  { path: 'proyecto/:id', component: ProyectoDetailComponent, canActivate:[RedirectToLoginGuard]},
  { path: 'proyecto-new', component: ProyectoAddComponent, canActivate:[RedirectToLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
