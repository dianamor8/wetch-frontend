import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { InfoComponent } from './info/info.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [InfoComponent, QuienesSomosComponent, ContactoComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule
  ]
})
export class EmpresaModule { }
