import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectoListComponent } from './components/Proyecto/proyecto-list/proyecto-list.component';
import { ProyectoAddComponent } from './components/Proyecto/proyecto-add/proyecto-add.component';
import { ProyectoDetailComponent } from './components/Proyecto/proyecto-detail/proyecto-detail.component';
import { ProyectoDeleteComponent } from './components/Proyecto/proyecto-delete/proyecto-delete.component';
import { MaterialModule } from '../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProyectoEstudiosComponent } from './components/Proyecto/proyecto-estudios/proyecto-estudios.component';
import { PrefactibilidadDeleteComponent } from './components/Prefactibilidad/prefactibilidad-delete/prefactibilidad-delete.component';
import { PrefactibilidadAddComponent } from './components/Prefactibilidad/prefactibilidad-add/prefactibilidad-add.component';
import { PrefactibilidadDetailComponent } from './components/Prefactibilidad/prefactibilidad-detail/prefactibilidad-detail.component';
import { RouterModule } from '@angular/router';
import { FindAmbienteComponent } from './components/Prefactibilidad/find-ambiente/find-ambiente.component';
import { ResultsComponent } from './components/Prefactibilidad/results/results.component';


@NgModule({
  declarations: [ProyectoListComponent, ProyectoAddComponent, ProyectoDetailComponent, ProyectoDeleteComponent, ProyectoEstudiosComponent, PrefactibilidadDeleteComponent, PrefactibilidadAddComponent, PrefactibilidadDetailComponent, FindAmbienteComponent, ResultsComponent],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    MaterialModule,
    RouterModule,
  ],  
  providers:[
    MatDatepickerModule
  ],
  entryComponents:[ProyectoDeleteComponent, FindAmbienteComponent, PrefactibilidadDeleteComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProyectosModule { }
