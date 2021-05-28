import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToLoginGuard } from '../auth/guard/redirect-to-login.guard';
import { PrefactibilidadAddComponent } from './components/Prefactibilidad/prefactibilidad-add/prefactibilidad-add.component';
import { ResultsComponent } from './components/Prefactibilidad/results/results.component';
import { ProyectoAddComponent } from './components/Proyecto/proyecto-add/proyecto-add.component';
import { ProyectoDetailComponent } from './components/Proyecto/proyecto-detail/proyecto-detail.component';
import { ProyectoEstudiosComponent } from './components/Proyecto/proyecto-estudios/proyecto-estudios.component';
import { ProyectoListComponent } from './components/Proyecto/proyecto-list/proyecto-list.component';

const routes: Routes = [  
  { path: 'proyectos-list', component: ProyectoListComponent, canActivate:[RedirectToLoginGuard] },
  { path: 'proyecto/:id', component: ProyectoDetailComponent, canActivate:[RedirectToLoginGuard]},
  { path: 'proyecto-new', component: ProyectoAddComponent, canActivate:[RedirectToLoginGuard]},
  { path: 'proyecto-estudios/:id', component: ProyectoEstudiosComponent, canActivate:[RedirectToLoginGuard]},
  { path: 'prefactibilidad-new/:idProyecto', component: PrefactibilidadAddComponent, canActivate:[RedirectToLoginGuard]},    
  { path: 'prefactibilidad-update/:idProyecto/:id', component: PrefactibilidadAddComponent, canActivate:[RedirectToLoginGuard]},      
  { path: 'prefactibilidad-results/:idProyecto/:id', component: ResultsComponent, canActivate:[RedirectToLoginGuard]},      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
