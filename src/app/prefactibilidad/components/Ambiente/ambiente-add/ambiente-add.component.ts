import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { addAmbiente, getAllTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';
import { PrefactibilidadService } from 'src/app/prefactibilidad/service/prefactibilidad.service';
import { FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { minLengthArray } from 'src/app/prefactibilidad/validators/prefact.validator';
import { Ambiente, AreaVivienda } from 'src/app/prefactibilidad/models/ambiente';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-ambiente-add',
  templateUrl: './ambiente-add.component.html',
  styleUrls: ['./ambiente-add.component.scss']
})
export class AmbienteAddComponent implements OnInit {
  
  tiposAreaVivienda:TipoAreaVivienda[];
  prefactibilidadState$:PrefactibilidadState;

  nombre:FormControl;
  descripcion:FormControl;
  ambienteForm: FormGroup;

  // areasForms:FormArray;
  tipoAreaForm: FormGroup;
  area:FormControl;  
  TipoAreaVivienda:FormControl;  
  bSubmitted:boolean=false;

  ambiente:Ambiente;
  user:User;

  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
  ) { 
    this.store.select('prefactibilidadApp').subscribe(prefactStore=>{      
      this.prefactibilidadState$=prefactStore;      
      this.tiposAreaVivienda = this.prefactibilidadState$.tipoAreaViviendas;
    });
    this.store.select('authApp').subscribe(authStore =>{     
      if(authStore.userAuth){
        this.user = Object.assign(new User(), authStore.userAuth);
      }else{
        this.user = authStore.userAuth;
      } 
    });
  }

  ngOnInit(): void { 
    if(this.prefactibilidadState$.tipoAreaViviendas.length===0){      
      this.store.dispatch(getAllTipoAreaVivienda());
    }
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);
    this.descripcion = new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(4)]);    
    this.ambienteForm = this.formBuilder.group({
      nombre: this.nombre,
      descripcion:this.descripcion,
      areas: this.formBuilder.array([
        this.createFormArea()
      ], minLengthArray(1))
    })
  }

  get areas() {
    return this.ambienteForm.get('areas') as FormArray;    
  }

  addArea() {
    this.areas.push(this.createFormArea());
  }

  removeArea(index:number) {
    this.areas.removeAt(index);
  }
  
  createFormArea(): FormGroup {
    return this.formBuilder.group({
      area : this.area = new FormControl('', [Validators.required, Validators.min(0.1),Validators.pattern(/^\d+\.\d{2}$/)]),
      TipoAreaVivienda : this.TipoAreaVivienda = new FormControl('', [Validators.required])
    });
  }

  save():void{
    this.bSubmitted = true;
    if(this.ambienteForm.valid){      
      this.ambiente = {...new Ambiente(),...this.ambienteForm.value};
      this.ambiente.propietario = this.user;
      this.ambiente.areas = []

      let form_areas=[];
      form_areas = this.areas.value;

      form_areas.map((area)=>{
        let tipoAreaVivienda = this.tiposAreaVivienda.map<TipoAreaVivienda>(
          (tav)=> tav as TipoAreaVivienda).filter(
            (ta)=>ta.id === parseInt(area.TipoAreaVivienda));
        // let tipoAreaVivienda = this.tiposAreaVivienda.map<TipoAreaVivienda>((tav)=> tav.id === area.TipoAreaVivienda instanceof TipoAreaVivienda);        
        // let areaVivienda  = new AreaVivienda(parseInt(area.area), tipoAreaVivienda as TipoAreaVivienda);        
        let areaVivienda = new AreaVivienda();
        areaVivienda.area = area.area;
        areaVivienda.tipoAreaVivienda = {...new TipoAreaVivienda(), ...tipoAreaVivienda};      
        this.ambiente.areas.push(areaVivienda);
        return true;
      })                  
      this.store.dispatch(addAmbiente({ambiente:this.ambiente}));
    }
  }

  

}
