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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
