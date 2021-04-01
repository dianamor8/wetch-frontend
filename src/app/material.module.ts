import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  exports: [
      MatButtonModule,
      MatSidenavModule,
      MatToolbarModule
    ],
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
