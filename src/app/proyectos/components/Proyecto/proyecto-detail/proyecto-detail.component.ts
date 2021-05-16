import { DatePipe } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { updateProyecto } from 'src/app/proyectos/actions';
import { Canton, Parroquia, Provincia, Proyecto, Ubicacion } from 'src/app/proyectos/models/proyecto';
import { ProyectosState } from 'src/app/proyectos/reducers';
import { ProyectosService } from 'src/app/proyectos/service/proyectos.service';
import { getProyectoById } from "src/app/proyectos/selectors";

@Component({
  selector: 'app-proyecto-detail',
  templateUrl: './proyecto-detail.component.html',
  styleUrls: ['./proyecto-detail.component.scss'],
  providers:[DatePipe]
})
export class ProyectoDetailComponent implements OnInit {

  proyectoState$:ProyectosState;  
  proyectoForm: FormGroup;
  titulo:FormControl;
  fecha:FormControl;
  descripcion:FormControl;
  solicitante:FormControl;
  direccionForm: FormGroup;
  provincia:FormControl;
  canton:FormControl;
  parroquia:FormControl;
  direccion:FormControl;
  
  provincias:Provincia[];  
  cantones:Canton[];  
  parroquias:Parroquia[];  
  provinciaSelected:Provincia;
  cantonSelected:Canton;

  id:number;
  @Input() proyecto:Proyecto;
  user:User;

  maxDate: Date;
  bSubmitted:boolean; 

  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    private proyectoService: ProyectosService,
    private datePipe:DatePipe,
    private route:ActivatedRoute
  ) { 
    this.proyectoService.getJSON().subscribe(response=>{      
      this.provincias = response;
      if(this.proyecto){
        this.onSelectProvincia(this.proyecto.ubicacion.provincia);
        this.onSelectCanton(this.proyecto.ubicacion.canton);
      }      
    });

    this.getDateToday();
    this.store.select('proyectosApp').subscribe(proyectoStore=>{      
      this.proyectoState$=proyectoStore;    
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
    });
  
    this.store.select(getProyectoById(this.id)).subscribe((proy:Proyecto)=>this.proyecto = proy);        

    this.titulo = new FormControl(this.proyecto.titulo, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.fecha = new FormControl(this.proyecto.fecha, [Validators.required]);
    this.descripcion = new FormControl(this.proyecto.descripcion, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.solicitante = new FormControl(this.proyecto.solicitante, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.provincia = new FormControl(this.proyecto.ubicacion.provincia, [Validators.required]);    
    this.canton = new FormControl(this.proyecto.ubicacion.canton, [Validators.required]);    
    this.parroquia = new FormControl(this.proyecto.ubicacion.parroquia, [Validators.required]);   
    this.direccion = new FormControl(this.proyecto.ubicacion.direccion, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.direccionForm = this.formBuilder.group({
      provincia: this.provincia,
      canton:this.canton,
      parroquia: this.parroquia,
      direccion:this.direccion
     })
    this.proyectoForm = this.formBuilder.group({
      titulo: this.titulo,      
      fecha:this.fecha,
      solicitante:this.solicitante,
      descripcion:this.descripcion,
      direccion: this.direccionForm
    });    
  }

  getDateToday(){    
    this.maxDate = new Date();
  }

  onSelectProvincia(id:any):void{
    this.provinciaSelected = this.provincias.find((x:Provincia)=> x.codigo === id);        
    this.cantones = this.provinciaSelected.cantones;
    this.parroquias = [];
  }

  onSelectCanton(id:any):void{    
    let cantonSelected = this.provinciaSelected.cantones.find((x:Canton)=> x.codigo === id);        
    this.parroquias = cantonSelected.parroquias;    
  }

  save():void{
    this.bSubmitted = true;
    if(this.proyectoForm.valid){
      this.proyecto = {...this.proyecto, ...this.proyectoForm.value};
      this.proyecto.propietario = this.user;
      this.proyecto.fecha = new Date(this.datePipe.transform(this.proyectoForm.get('fecha').value, 'yyyy-MM-dd h:mm:ss'));      
      let ubicacion = {...this.proyecto.ubicacion, ...this.direccionForm.value};
      this.proyecto.ubicacion = ubicacion;
      this.store.dispatch(updateProyecto({proyecto:this.proyecto}));
    }
  }
}
