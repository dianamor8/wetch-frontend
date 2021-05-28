import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { InfoComponent } from './info/info.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MaterialModule } from '../material.module';
import { ContactoListComponent } from './contacto/contacto-list/contacto-list.component';
import { ContactoDetailComponent } from './contacto/contacto-detail/contacto-detail.component';
import { ContactoDeleteComponent } from './contacto/contacto-delete/contacto-delete.component';


@NgModule({
  declarations: [InfoComponent, QuienesSomosComponent, ContactoComponent, ContactoListComponent, ContactoDetailComponent, ContactoDeleteComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule
  ], 
  entryComponents:[ContactoDeleteComponent]
})
export class EmpresaModule {   
}
