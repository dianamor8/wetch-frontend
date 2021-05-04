import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { TipoAreaViviendaDetailComponent } from '../tipo-area-vivienda-detail/tipo-area-vivienda-detail.component';

@Component({
  selector: 'app-tipo-area-vivienda-delete',
  templateUrl: './tipo-area-vivienda-delete.component.html',
  styleUrls: ['./tipo-area-vivienda-delete.component.scss']
})
export class TipoAreaViviendaDeleteComponent implements OnInit {

  @Input() tipoAreaVivienda:TipoAreaVivienda;
  
  constructor(
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<TipoAreaViviendaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tipoAreaVivienda: TipoAreaVivienda}
  ) {
    this.tipoAreaVivienda = data.tipoAreaVivienda;
   }

  ngOnInit(): void {
  }

  delete():void{
    if(this.tipoAreaVivienda){
      this.store.dispatch(deleteTipoAreaVivienda({tipoAreaVivienda:this.tipoAreaVivienda}));
      this.dialogRef.close();
    }
  }

}
