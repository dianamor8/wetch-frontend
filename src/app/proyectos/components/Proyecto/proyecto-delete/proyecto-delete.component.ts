import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteProyecto } from 'src/app/proyectos/actions';
import { Proyecto } from 'src/app/proyectos/models/proyecto';

@Component({
  selector: 'app-proyecto-delete',
  templateUrl: './proyecto-delete.component.html',
  styleUrls: ['./proyecto-delete.component.scss']
})
export class ProyectoDeleteComponent implements OnInit {

  @Input() proyecto:Proyecto;
  eliminar:FormControl;
  eliminarForm:FormGroup;
   
  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<ProyectoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {proyecto: Proyecto}
  ) {
    this.proyecto = data.proyecto;
   }

  ngOnInit(): void {
    this.eliminar = new FormControl('',[Validators.required, Validators.pattern(/^\beliminar\b$/)] );
    this.eliminarForm = this.formBuilder.group({
      eliminar: this.eliminar
    })
    
  }

  delete():void{
    if(this.proyecto){
      if(this.eliminarForm.value){
        if(this.eliminarForm.get('eliminar').value === 'eliminar')        
        this.store.dispatch(deleteProyecto({proyecto:this.proyecto}));
        this.dialogRef.close();
      }      
    }
  }
}
