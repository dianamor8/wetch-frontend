import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefactibilidadRoutingModule } from './prefactibilidad-routing.module';
import { AreaViviendaComponent } from './components/AreaVivienda/area-vivienda.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { TipoAreaViviendaListComponent } from './components/TipoAreaVivienda/tipo-area-vivienda-list/tipo-area-vivienda-list.component';
import { TipoAreaViviendaDetailComponent } from './components/TipoAreaVivienda/tipo-area-vivienda-detail/tipo-area-vivienda-detail.component';
import { TipoAreaViviendaDeleteComponent } from './components/TipoAreaVivienda/tipo-area-vivienda-delete/tipo-area-vivienda-delete.component';
import { AmbienteListComponent } from './components/Ambiente/ambiente-list/ambiente-list.component';
import { AmbienteAddComponent } from './components/Ambiente/ambiente-add/ambiente-add.component';
import { AmbienteDetailComponent } from './components/Ambiente/ambiente-detail/ambiente-detail.component';
import { AmbienteDeleteComponent } from './components/Ambiente/ambiente-delete/ambiente-delete.component';
import { AcabadoListComponent } from './components/Acabado/acabado-list/acabado-list.component';
import { AcabadoDetailComponent } from './components/Acabado/acabado-detail/acabado-detail.component';
import { AcabadoDeleteComponent } from './components/Acabado/acabado-delete/acabado-delete.component';


@NgModule({
  declarations: [ AreaViviendaComponent,TipoAreaViviendaListComponent, TipoAreaViviendaDetailComponent, TipoAreaViviendaDeleteComponent, AmbienteListComponent, AmbienteAddComponent, AmbienteDetailComponent, AmbienteDeleteComponent, AcabadoListComponent, AcabadoDetailComponent, AcabadoDeleteComponent],
  imports: [
    CommonModule,
    PrefactibilidadRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents:[TipoAreaViviendaDetailComponent, TipoAreaViviendaDeleteComponent, AmbienteDeleteComponent, AreaViviendaComponent, AcabadoDeleteComponent, AcabadoDetailComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PrefactibilidadModule { }
