import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deletePrefactibilidad } from 'src/app/proyectos/actions';
import { Prefactibilidad } from 'src/app/proyectos/models/proyecto';

@Component({
  selector: 'app-prefactibilidad-delete',
  templateUrl: './prefactibilidad-delete.component.html',
  styleUrls: ['./prefactibilidad-delete.component.scss']
})
export class PrefactibilidadDeleteComponent implements OnInit {

  @Input() prefactibilidad:Prefactibilidad;

  constructor(
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<PrefactibilidadDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {prefactibilidad: Prefactibilidad}
  ) { 
    this.prefactibilidad = data.prefactibilidad;
  }

  ngOnInit(): void {
  }

  delete():void{
    if(this.prefactibilidad){
      this.store.dispatch(deletePrefactibilidad({prefactibilidad:this.prefactibilidad}));
      this.dialogRef.close();
    }
  }

}
