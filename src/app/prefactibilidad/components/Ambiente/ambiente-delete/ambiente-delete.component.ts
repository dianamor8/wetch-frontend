import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteAmbiente } from 'src/app/prefactibilidad/actions';
import { Ambiente } from 'src/app/prefactibilidad/models/ambiente';

@Component({
  selector: 'app-ambiente-delete',
  templateUrl: './ambiente-delete.component.html',
  styleUrls: ['./ambiente-delete.component.scss']
})
export class AmbienteDeleteComponent implements OnInit {

  @Input() ambiente:Ambiente;

  constructor(
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<AmbienteDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {ambiente: Ambiente}
  ) { 
    this.ambiente = data.ambiente;
  }

  ngOnInit(): void {
  }

  delete():void{
    if(this.ambiente){
      this.store.dispatch(deleteAmbiente({ambiente:this.ambiente}));
      this.dialogRef.close();
    }
  }

}
