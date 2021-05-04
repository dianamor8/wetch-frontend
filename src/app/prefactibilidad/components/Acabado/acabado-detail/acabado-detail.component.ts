import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { addAcabado, updateAcabado } from 'src/app/prefactibilidad/actions';
import { TipoAcabado } from 'src/app/prefactibilidad/models/acabado';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';

@Component({
  selector: 'app-acabado-detail',
  templateUrl: './acabado-detail.component.html',
  styleUrls: ['./acabado-detail.component.scss']
})
export class AcabadoDetailComponent implements OnInit {

  @Input() acabado:TipoAcabado;
  title:string;
  bSubmitted:boolean;

  prefactibilidadState$:PrefactibilidadState;

  acabadoForm: FormGroup;
  nombre:FormControl;
  costoAcabadoVivienda:FormControl;
  
  constructor(
    private store:Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AcabadoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {acabado: TipoAcabado, title:string}
  ) {
    this.title = data.title;
    this.acabado = data.acabado;    
    this.store.select('prefactibilidadApp').subscribe(prefactState=>this.prefactibilidadState$ = prefactState)
   }

  ngOnInit(): void {
    this.nombre = new FormControl(this.acabado.nombre, [Validators.required, Validators.maxLength(240)]);
    this.costoAcabadoVivienda = new FormControl(this.acabado.costoAcabadoVivienda, [Validators.required, Validators.min(0), Validators.pattern(/^\d+\.\d{2}$/)]);    
    this.acabadoForm = this.formBuilder.group({
      nombre:this.nombre,      
      costoAcabadoVivienda:this.costoAcabadoVivienda,      
    });        
    this.bSubmitted = false;
  }

  save():void{
    this.bSubmitted = true;    
    if(this.acabadoForm.valid){      
      if(this.title==='Nuevo'){
        this.acabado = this.acabadoForm.value;
        this.store.dispatch(addAcabado({acabado:this.acabado}));
        this.dialogRef.close();
      }else{                        
        this.acabado = {...this.acabado, ...this.acabadoForm.value};
        this.store.dispatch(updateAcabado({acabado:this.acabado}));
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
