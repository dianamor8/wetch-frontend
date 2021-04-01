import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefactibilidadRoutingModule } from './prefactibilidad-routing.module';
import { AreaViviendaComponent } from './area-vivienda/area-vivienda.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [ AreaViviendaComponent],
  imports: [
    CommonModule,
    PrefactibilidadRoutingModule,
    MaterialModule
  ]
})
export class PrefactibilidadModule { }
