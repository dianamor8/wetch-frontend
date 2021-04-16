import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './index/header/header.component';
import { FooterComponent } from './index/footer/footer.component';
import { FooterDefComponent } from './default/footer-def/footer-def.component';
import { SidebarDefComponent } from './default/sidebar-def/sidebar-def.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';



@NgModule({
  declarations: [IndexComponent, DefaultComponent, HeaderComponent, FooterComponent, FooterDefComponent, SidebarDefComponent, DashboardComponent, MainComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    UtilitariosModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayoutModule { }
