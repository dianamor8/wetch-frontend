import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/components/messages.component';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MessagesComponent],
  providers: [
    { provide: MAT_SNACK_BAR_DATA,  useValue: {} },
    { provide: MatSnackBarRef, useValue: {} }
  ],
  entryComponents: [MessagesComponent],
})
export class UtilitariosModule { }
