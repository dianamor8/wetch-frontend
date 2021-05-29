import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { addProyecto } from 'src/app/proyectos/actions';
import { Canton, Parroquia, Propietario, Provincia, Proyecto, Ubicacion } from 'src/app/proyectos/models/proyecto';
import { proyectosReducer, ProyectosState } from 'src/app/proyectos/reducers';
import { ProyectosService } from 'src/app/proyectos/service/proyectos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proyecto-add',
  templateUrl: './proyecto-add.component.html',
  styleUrls: ['./proyecto-add.component.scss'],
  providers:[DatePipe]
})
export class ProyectoAddComponent implements OnInit {

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

  proyecto:Proyecto;
  user:User;

  maxDate: Date;
  bSubmitted:boolean; 

  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    private proyectoService: ProyectosService,
    private datePipe:DatePipe,
  ) {
    this.proyectoService.getJSON().subscribe(response=>{      
      this.provincias = response;
    })

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

    
    this.titulo = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.fecha = new FormControl('', [Validators.required]);
    this.descripcion = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.solicitante = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.provincia = new FormControl('', [Validators.required]);    
    this.canton = new FormControl('', [Validators.required]);    
    this.parroquia = new FormControl('', [Validators.required]);   
    this.direccion = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
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

  save():void{
    this.bSubmitted = true;
    if(this.proyectoForm.valid){
      let propietario = new Propietario();
      propietario.id= this.user.id;
      propietario.nombre = this.user.name;

      this.proyecto = {...new Proyecto(), ...this.proyectoForm.value};
      this.proyecto.propietario = propietario;      
      this.proyecto.fecha = new Date(this.datePipe.transform(this.proyectoForm.get('fecha').value, 'yyyy-MM-dd h:mm:ss'));      
      let ubicacion = {...new Ubicacion(), ...this.direccionForm.value};
      this.proyecto.ubicacion = ubicacion;
      this.store.dispatch(addProyecto({proyecto:this.proyecto}));
    }
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
}


// { "glob": "ubicacion.json", "input": "./", "output": "./assets/" }