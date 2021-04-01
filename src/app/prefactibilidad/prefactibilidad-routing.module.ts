import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaViviendaComponent } from './area-vivienda/area-vivienda.component';

const routes: Routes = [
  { path: 'areaVivienda', component: AreaViviendaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefactibilidadRoutingModule { }
