import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { addTipoAreaVivienda, updateTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';

@Component({
  selector: 'app-tipo-area-vivienda-detail',
  templateUrl: './tipo-area-vivienda-detail.component.html',
  styleUrls: ['./tipo-area-vivienda-detail.component.scss']
})
export class TipoAreaViviendaDetailComponent implements OnInit {

  @Input() tipoAreaVivienda:TipoAreaVivienda;
  
  title:string;
  bSubmitted:boolean;

  prefactibilidadState$:PrefactibilidadState;

  tipoAreaViviendaForm: FormGroup;
  nombre:FormControl;
  factorCirculacionParedes:FormControl;
  factorDireccionTecnica:FormControl;

  constructor(
    private store:Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TipoAreaViviendaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tipoAreaVivienda: TipoAreaVivienda, title:string}
  ) {
    this.title = data.title;
    this.tipoAreaVivienda = data.tipoAreaVivienda;    
    this.store.select('prefactibilidadApp').subscribe(prefactState=>this.prefactibilidadState$ = prefactState)
   }

  ngOnInit(): void {
    this.nombre = new FormControl(this.tipoAreaVivienda.nombre, [Validators.required, Validators.maxLength(240)]);
    this.factorCirculacionParedes = new FormControl(this.tipoAreaVivienda.factorCirculacionParedes, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+\.\d{2}$/)]);
    this.factorDireccionTecnica = new FormControl(this.tipoAreaVivienda.factorDireccionTecnica, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+\.\d{2}$/)]);
    this.tipoAreaViviendaForm = this.formBuilder.group({
      nombre:this.nombre,      
      factorCirculacionParedes:this.factorCirculacionParedes,
      factorDireccionTecnica:this.factorDireccionTecnica      
    });        
    this.bSubmitted = false;
  }

  save():void{
    this.bSubmitted = true;    
    if(this.tipoAreaViviendaForm.valid){      
      if(this.title==='Nuevo'){
        this.tipoAreaVivienda = this.tipoAreaViviendaForm.value;
        this.store.dispatch(addTipoAreaVivienda({tipoAreaVivienda:this.tipoAreaVivienda}));
        this.dialogRef.close();
      }else{                        
        this.tipoAreaVivienda = {...this.tipoAreaVivienda, ...this.tipoAreaViviendaForm.value};        
        this.store.dispatch(updateTipoAreaVivienda({tipoAreaVivienda:this.tipoAreaVivienda}));
        this.dialogRef.close();
      }
    }
  }

  isNew():boolean{
    if(this.title==='Nuevo'){
      return true;
    }else{
      return false;
    }
  }

  
}
