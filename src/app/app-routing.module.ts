import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { DefaultComponent } from './layout/default/default.component';
import { IndexComponent } from './layout/index/index.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [  
  { path: '', component: IndexComponent, children:[
    { path: '', component:MainComponent},
    { path: 'empresa', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) }
  ]},
  { path: '', component: DefaultComponent, children:[
    { path: 'dashboard', component:DashboardComponent},
    { path: 'prefact', loadChildren: () => import('./prefactibilidad/prefactibilidad.module').then(m => m.PrefactibilidadModule) },
  ]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
