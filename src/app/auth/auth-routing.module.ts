import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ValidateAccountComponent } from './components/validate-account/validate-account.component';
import { AuthGuard } from './guard/auth.guard';
import { HasTokenGuard } from './guard/has-token.guard';
import { ValidateAccountGuard } from './guard/validate-account.guard';

const routes: Routes = [  
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'change-password', component: ChangePasswordComponent, canActivate:[HasTokenGuard]},
  { path: 'validate-account', component: ValidateAccountComponent, canActivate:[ValidateAccountGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
