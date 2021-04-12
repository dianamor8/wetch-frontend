import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  exports: [
      FlexLayoutModule,
      FontAwesomeModule,
      MatButtonModule,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatListModule,
      MatDividerModule,
      ReactiveFormsModule
    ],
  imports: [
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
