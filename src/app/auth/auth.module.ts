import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MyAsyncValidator } from './validators/auth.async.validator';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserAsyncValidator } from './validators/user.async.validator';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ValidateAccountComponent } from './components/validate-account/validate-account.component';


@NgModule({
  declarations: [ LoginComponent, RegisterComponent, MyAsyncValidator, ResetPasswordComponent, UserAsyncValidator, ChangePasswordComponent, ValidateAccountComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class AuthModule { }
