import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteAcabado } from 'src/app/prefactibilidad/actions';
import { TipoAcabado } from 'src/app/prefactibilidad/models/acabado';

@Component({
  selector: 'app-acabado-delete',
  templateUrl: './acabado-delete.component.html',
  styleUrls: ['./acabado-delete.component.scss']
})
export class AcabadoDeleteComponent implements OnInit {

  @Input() acabado:TipoAcabado;
  
  constructor(
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<AcabadoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {acabado: TipoAcabado}
  ) {
    this.acabado = data.acabado;
   }

  ngOnInit(): void {
  }

  delete():void{
    if(this.acabado){
      this.store.dispatch(deleteAcabado({acabado:this.acabado}));
      this.dialogRef.close();
    }
  }
}
