import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToLoginGuard } from '../auth/guard/redirect-to-login.guard';
import { ContactoListComponent } from './contacto/contacto-list/contacto-list.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InfoComponent } from './info/info.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: 'proyectos', component: InfoComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },  
  { path: 'contacto', component: ContactoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
