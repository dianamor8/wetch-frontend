import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { UserListComponent } from './auth/components/user-list/user-list.component';
import { InicializationGuard } from './auth/guard/inicialization.guard';
import { IsAdminGuard } from './auth/guard/is-admin.guard';
import { PermissionGuard } from './auth/guard/permission.guard';
import { RedirectToLoginGuard } from './auth/guard/redirect-to-login.guard';
import { ContactoListComponent } from './empresa/contacto/contacto-list/contacto-list.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { DefaultComponent } from './layout/default/default.component';
import { IndexComponent } from './layout/index/index.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [  
  { path: '', component: IndexComponent, children:[
    { path: '', component:MainComponent, canActivate:[InicializationGuard]},
    { path: '', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule), canActivate:[InicializationGuard]}
  ]},
  { path: '', component: DefaultComponent, children:[
    { path: 'dashboard', component:DashboardComponent, canActivate:[RedirectToLoginGuard]},
    { path: 'prefactibilidad', loadChildren: () => import('./prefactibilidad/prefactibilidad.module').then(m => m.PrefactibilidadModule) },
    { path: 'proyectos', loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule) },
    { path: 'contacto-list', component: ContactoListComponent, canActivate:[RedirectToLoginGuard,PermissionGuard], data:{permission:'contacto.all'} },
    { path: 'profile', component: ProfileComponent, canActivate:[RedirectToLoginGuard]},
    { path: 'user-list', component: UserListComponent, canActivate:[RedirectToLoginGuard, IsAdminGuard]},
  ]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},      
  { path: '', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
