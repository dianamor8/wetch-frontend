import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectoListComponent } from './components/Proyecto/proyecto-list/proyecto-list.component';
import { ProyectoAddComponent } from './components/Proyecto/proyecto-add/proyecto-add.component';
import { ProyectoDetailComponent } from './components/Proyecto/proyecto-detail/proyecto-detail.component';
import { ProyectoDeleteComponent } from './components/Proyecto/proyecto-delete/proyecto-delete.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [ProyectoListComponent, ProyectoAddComponent, ProyectoDetailComponent, ProyectoDeleteComponent],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    MaterialModule
  ],
  entryComponents:[ProyectoDeleteComponent],
})
export class ProyectosModule { }
