import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MyAsyncValidator } from './validators/auth.async.validator';


@NgModule({
  declarations: [ LoginComponent, RegisterComponent, MyAsyncValidator],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class AuthModule { }
