import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { getAllTipoAreaVivienda, updateAmbiente } from 'src/app/prefactibilidad/actions';
import { Ambiente, AreaVivienda } from 'src/app/prefactibilidad/models/ambiente';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';
import { minLengthArray } from 'src/app/prefactibilidad/validators/prefact.validator';

import { getAmbienteById} from "./../../../selectors";

@Component({
  selector: 'app-ambiente-detail',
  templateUrl: './ambiente-detail.component.html',
  styleUrls: ['./ambiente-detail.component.scss']
})
export class AmbienteDetailComponent implements OnInit {

  @Input() ambiente:Ambiente;
  bSubmitted:boolean;
  prefactibilidadState$:PrefactibilidadState;
  tiposAreaVivienda:TipoAreaVivienda[];
  id:number;

  nombre:FormControl;
  descripcion:FormControl;
  ambienteForm: FormGroup;

  // areasForms:FormArray;
  tipoAreaForm: FormGroup;
  area:FormControl;  
  TipoAreaVivienda:FormControl;
  user:User;
  selected:number;

  constructor(
    private store:Store<AppState>,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.store.select('prefactibilidadApp').subscribe(prefactState=>{
      this.prefactibilidadState$ = prefactState;
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

    this.route.paramMap.subscribe((route)=>{
      this.id = +route.get('id');
    })
       
    this.store.select(getAmbienteById(this.id)).subscribe((a:Ambiente)=>this.ambiente = a);    
   
    if(this.prefactibilidadState$.tipoAreaViviendas.length===0){      
      this.store.dispatch(getAllTipoAreaVivienda());
    }
    this.nombre = new FormControl(this.ambiente.nombre, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);
    this.descripcion = new FormControl(this.ambiente.descripcion, [Validators.required, Validators.maxLength(500), Validators.minLength(4)]);    
    this.ambienteForm = this.formBuilder.group({
      nombre: this.nombre,
      descripcion:this.descripcion,
      areas: this.formBuilder.array([], minLengthArray(1))
    });
    this.createFormArrayAreas(this.ambiente.areas)
  }

  createFormArrayAreas(area:AreaVivienda[]) {
    area.map((area)=>{
      this.areas.push(this.createOldFormArea(area))
    })
  }

  get areas() {
    return this.ambienteForm.get('areas') as FormArray;    
  }

  addNewArea() {
    this.areas.push(this.createNewFormArea());
  }

  createNewFormArea(): FormGroup {
    return this.formBuilder.group({
      area : this.area = new FormControl('', [Validators.required, Validators.min(0.1),Validators.pattern(/^\d+\.\d{2}$/)]),
      TipoAreaVivienda : this.TipoAreaVivienda = new FormControl('', [Validators.required])
    });
  }


  createOldFormArea(areaVivienda:AreaVivienda): FormGroup {
    let fgroup = this.formBuilder.group({
      area : this.area = new FormControl(areaVivienda.area.toFixed(2), [Validators.required, Validators.min(0.1),Validators.pattern(/^\d+\.\d{2}$/)]),
      TipoAreaVivienda : this.TipoAreaVivienda = new FormControl(areaVivienda.tipoAreaVivienda.id, [Validators.required])
    });        
    return fgroup;
  }

  removeArea(index:number) {
    this.areas.removeAt(index);
  }

  save():void{
    this.bSubmitted = true;
    if(this.ambienteForm.valid){      
      this.ambiente = {...this.ambiente,...this.ambienteForm.value};
      this.ambiente.propietario = this.user;
      this.ambiente.areas = []

      let form_areas=[];
      form_areas = this.areas.value;

      form_areas.map((area)=>{
        let tipoAreaVivienda = this.tiposAreaVivienda.map<TipoAreaVivienda>(
          (tav)=> tav as TipoAreaVivienda).filter(
            (ta)=>ta.id === parseInt(area.TipoAreaVivienda));
        let areaVivienda = new AreaVivienda();
        areaVivienda.area = area.area;
        areaVivienda.tipoAreaVivienda = {...new TipoAreaVivienda(), ...tipoAreaVivienda};      
        this.ambiente.areas.push(areaVivienda);
        return true;
      })                  
      this.store.dispatch(updateAmbiente({ambiente:this.ambiente}));
    }
  }

  ConvertString(value){
    return parseFloat(value)
  }
}
