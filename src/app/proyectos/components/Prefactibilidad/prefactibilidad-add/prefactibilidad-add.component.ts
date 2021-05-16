import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { getAllAcabado, getAllAmbiente, getAllTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAcabado } from 'src/app/prefactibilidad/models/acabado';
import { Ambiente } from 'src/app/prefactibilidad/models/ambiente';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';
import { minLengthArray } from 'src/app/prefactibilidad/validators/prefact.validator';
import { Proyecto } from 'src/app/proyectos/models/proyecto';
import { ProyectosState } from 'src/app/proyectos/reducers';
import { getProyectoById } from 'src/app/proyectos/selectors';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';

@Component({
  selector: 'app-prefactibilidad-add',
  templateUrl: './prefactibilidad-add.component.html',
  styleUrls: ['./prefactibilidad-add.component.scss'],
})
export class PrefactibilidadAddComponent implements OnInit {
  proyectoState$: ProyectosState;
  prefactibilidadState$:PrefactibilidadState;

  // AREA CONSTRUCCIÓN FORM 
  prefactibilidadForm: FormGroup;  
  valorSueloUrbano: FormControl;
  tipoAreaVivenda: FormControl;
  tipoAcabado: FormControl;
  cantidad: FormControl;
  // busqueda = new FormControl();
  fillAmbientes:Observable<Ambiente[]>;

  tiposAreaVivienda:TipoAreaVivienda[];
  tiposAcabado:TipoAcabado[];
  ambientes:Ambiente[];

  // AREA CONSTRUCCIÓN FORM 
  areaConstruccionForm: FormGroup;
  
  retiroFrontal: FormControl;
  retiroPosterior: FormControl;
  retiroLateralIzquierdo: FormControl;
  retiroLateralDerecho: FormControl;
  medidaFrente: FormControl;
  medidaFondo: FormControl;
  frente_o_fondo: FormControl;
  areaTotal: FormControl;

  bSubmitted: boolean;
  aRegular: boolean = true;
  id: number;
  proyecto: Proyecto;
  user: User;
  calcAreaTotal: number = 0;
  calcFrente: number = 0;
  calcFondo: number = 0;
  calcAreaRetiros: number = 0;
  calcAreaCos: number = 0;
  calcPorcentajeArea: number = 0;

  disabled: boolean = true;
  message:boolean=false;
  activeTab:number=0;
  activeTabPlan:boolean=true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private messageService:MessageService,
  ) {
    this.store.select('proyectosApp').subscribe((proyectoStore) => {
      this.proyectoState$ = proyectoStore;
    });
    
    this.store.select('prefactibilidadApp').subscribe(prefactStore=>{          
      this.prefactibilidadState$ = prefactStore;
      this.tiposAreaVivienda = prefactStore.tipoAreaViviendas;
      this.tiposAcabado = prefactStore.acabados;
      this.ambientes = prefactStore.ambientes;
    });

    this.store.select('authApp').subscribe((authStore) => {
      if (authStore.userAuth) {
        this.user = Object.assign(new User(), authStore.userAuth);
      } else {
        this.user = authStore.userAuth;
      }
    });

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((route) => {
      this.id = +route.get('idProyecto');
    });

    if(this.prefactibilidadState$.tipoAreaViviendas.length===0){      
      this.store.dispatch(getAllTipoAreaVivienda());
    }

    if(this.prefactibilidadState$.acabados.length===0){      
      this.store.dispatch(getAllAcabado());
    }

    if(this.prefactibilidadState$.ambientes.length===0){      
      this.store.dispatch(getAllAmbiente());
      
    }

    this.store.select(getProyectoById(this.id)).subscribe((proy: Proyecto) => {
      this.proyecto = proy;
    });

    this.retiroFrontal = new FormControl({ value: '0.00', disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.retiroPosterior = new FormControl({ value: '0.00', disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.retiroLateralDerecho = new FormControl(
      { value: '0.00', disabled: true },
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+\.\d{2}$/),
      ]
    );
    this.retiroLateralIzquierdo = new FormControl(
      { value: '0.00', disabled: true },
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+\.\d{2}$/),
      ]
    );
    this.medidaFondo = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.medidaFrente = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.areaTotal = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.frente_o_fondo = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    //FORMULARIO AREA DE CONSTRUCCIÓN 
    this.areaConstruccionForm = this.formBuilder.group(
      {        
        retiroFrontal: this.retiroFrontal,
        retiroPosterior: this.retiroPosterior,
        retiroLateralDerecho: this.retiroLateralDerecho,
        retiroLateralIzquierdo: this.retiroLateralIzquierdo,
        medidaFondo: this.medidaFondo,
        medidaFrente: this.medidaFrente,
        frente_o_fondo: this.frente_o_fondo,
        areaTotal: this.areaTotal,
      },
      { validator: Validators.compose([]) }
    );
    //FORMULARIO DE PREFACTIBILIDAD 
    this.valorSueloUrbano = new FormControl ('0.00', [Validators.required, Validators.min(0), Validators.pattern(/^\d+\.\d{2}$/)]);
    this.tipoAreaVivenda = new FormControl('', [Validators.required]);
    this.tipoAcabado = new FormControl('', [Validators.required]);

    this.prefactibilidadForm = this.formBuilder.group(
      {        
        valorSueloUrbano: this.valorSueloUrbano,
        tipoAreaVivienda: this.tipoAreaVivenda,
        tipoAcabado: this.tipoAcabado,
        itemsPrefactibilidad: this.formBuilder.array([], minLengthArray(1))     
      }
    );
    this.createFormArrayItems(this.transactions);

    // this.fillAmbientes = this.busqueda.valueChanges.pipe(
    //   // debounceTime(500),      
    //   startWith(''),
    //   map(val=>this._filter(val))
    // );
  }

  saveAreaConstruccion():void {    
    if(this.calcAreaCos>0){      
      this.changeTab();
      //VALIDAR PLAN DE NECESIDADES
    }else{
      this.messageService.showNotification('El Coeficiente de ocupación del suelo no puede ser negativo o cero', 'Precaución','Ok', 'warning', 4000);
      this.disableTabPlan();
    }
  }

  changeCombo(event): void {    
    if (event.value === '1') {
      this.aRegular = true;            
    } else {
      this.aRegular = false;            
    }        
  }
  retiros_event(event): void {
    let medidaFr = this.areaConstruccionForm.get('medidaFrente');
    let medidaFo = this.areaConstruccionForm.get('medidaFondo');
    if (medidaFr.valid && medidaFo.valid && parseFloat(medidaFr.value)>0 && parseFloat(medidaFo.value)>0) {
      this.calcAreaTotal = this.calcularAreaTotal(parseFloat(medidaFr.value), parseFloat(medidaFo.value))         
      this.calcFrente = parseFloat(medidaFr.value);
      this.calcFondo = parseFloat(medidaFo.value);                     
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      this.enableRetiros();
      if(this.calcPorcentajeArea <= 60){
        this.message = true;        
      }
      this.validarAreas();  
    } else {
      this.calcAreaTotal = 0;
      this.calcAreaCos = 0;
      this.calcPorcentajeArea = 0;
      this.calcFrente=0;
      this.calcFondo=0;
      this.message = false;
      this.disableRetiros();      
    }
  }

  retiros_irregular_event(event): void {
    let medidaFoF = this.areaConstruccionForm.get('frente_o_fondo');
    let medidaAt = this.areaConstruccionForm.get('areaTotal');
    
    if (medidaFoF.valid && medidaAt.valid && parseFloat(medidaFoF.value)>0 && parseFloat(medidaAt.value)>0) {
      this.calcAreaTotal = parseFloat(medidaAt.value);
      this.calcFrente = parseFloat(medidaFoF.value);
      this.calcFondo = this.calcAreaTotal / parseFloat(medidaFoF.value);  
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      this.enableRetiros();    
      if(this.calcPorcentajeArea <= 60){
        this.message= true;        
      }
      this.validarAreas();                               
    }else{
      this.calcAreaTotal = 0;
      this.calcAreaCos = 0;
      this.calcPorcentajeArea = 0;
      this.calcFrente=0;
      this.calcFondo=0;
      this.message= false;
      this.disableRetiros();
    }
  }

  validarAreas():void{
    // VERIFICA SI EL ÁREA DE LOS RETIROS ES MAYOR QUE EL AREA INGRESADA 
    if(this.calcAreaRetiros>= this.calcAreaTotal){
      if(this.aRegular){
        this.areaConstruccionForm.controls['medidaFrente'].setErrors({'incorrect': true});
      }else{
        this.areaConstruccionForm.controls['areaTotal'].setErrors({'incorrect': true});
      }      
      this.disableTabPlan();    
    }else{
      //SI ES MENOR QUE CERO AGREGAR UN ERROR SINO DAR PASO 236 HASTA 242
      if(this.aRegular){
        this.areaConstruccionForm.controls['medidaFrente'].setErrors({'incorrect': null});
        this.areaConstruccionForm.controls['medidaFrente'].updateValueAndValidity();
      }else{
        this.areaConstruccionForm.controls['areaTotal'].setErrors({'incorrect': null});
        this.areaConstruccionForm.controls['areaTotal'].updateValueAndValidity();
      } 
      this.enableTabPlan();
    }
  }

  calcularAreaRetiros(event): void {    
    if(this.validarCamposRetiro){
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      if(this.calcPorcentajeArea <= 60){
        this.message=true;        
      }else{
        this.message=false;
      }
      this.validarAreas(); 
      this.validarFrenteFondo();
      this.validarlaterales();      
    }
  }

  

  enableRetiros(): void {
    this.areaConstruccionForm.controls['retiroFrontal'].enable();
    this.areaConstruccionForm.controls['retiroPosterior'].enable();
    this.areaConstruccionForm.controls['retiroLateralIzquierdo'].enable();
    this.areaConstruccionForm.controls['retiroLateralDerecho'].enable();
  }

  disableRetiros(): void {
    this.areaConstruccionForm.controls['retiroFrontal'].disable();
    this.areaConstruccionForm.controls['retiroPosterior'].disable();
    this.areaConstruccionForm.controls['retiroLateralIzquierdo'].disable();
    this.areaConstruccionForm.controls['retiroLateralDerecho'].disable();
  }

  resetRetiros():void {
    this.areaConstruccionForm.get('retiroFrontal').setValue('0.00');
    this.areaConstruccionForm.get('retiroPosterior').setValue('0.00');
    this.areaConstruccionForm.get('retiroLateralIzquierdo').setValue('0.00');
    this.areaConstruccionForm.get('retiroLateralDerecho').setValue('0.00');
  }

  isVisited():boolean {
    let retiroF = this.areaConstruccionForm.get('retiroFrontal');
    let retiroP = this.areaConstruccionForm.get('retiroPosterior');
    let retiroLI = this.areaConstruccionForm.get('retiroLateralIzquierdo');
    let retiroLD = this.areaConstruccionForm.get('retiroLateralDerecho');

    if(retiroF.dirty || retiroP.dirty || retiroLI || retiroLD){
      return true;
    }else{
      return false;
    }
  }

  calcularRetirosForm():number{    
      let retiroF = this.areaConstruccionForm.get('retiroFrontal').value;
      let retiroP = this.areaConstruccionForm.get('retiroPosterior').value;
      let retiroLI = this.areaConstruccionForm.get('retiroLateralIzquierdo').value;
      let retiroLD = this.areaConstruccionForm.get('retiroLateralDerecho').value;
      return this.calcularRetiros(retiroF, retiroP, retiroLD, retiroLI, this.calcFrente, this.calcFondo)   
  }

  // SUMA DE AREAS DE RETIROS
  calcularRetiros(rfrontal:number, rposterior:number, rlateralD:number, rlateralI:number, frente:number, fondo:number ):number{
      let sumaAreas= (rfrontal*frente) + (rposterior*frente) + (rlateralD*fondo) + (rlateralI*fondo);
      return sumaAreas;
  }

  validarCamposRetiro():boolean{
    let retiroF = this.areaConstruccionForm.get('retiroFrontal');
    let retiroP = this.areaConstruccionForm.get('retiroPosterior');
    let retiroLI = this.areaConstruccionForm.get('retiroLateralIzquierdo');
    let retiroLD = this.areaConstruccionForm.get('retiroLateralDerecho');
    if(retiroF.valid && retiroP.valid && retiroLI.valid && retiroLD.valid ){
      return true;
    }else{
      return false;
    }
  }

  calcularAreaTotal(frente:number, fondo:number):number{
    return frente*fondo;
  }

  calcularCOS():void{
    this.calcAreaCos = this.calcAreaTotal - this.calcAreaRetiros;
    this.calcPorcentajeArea = (this.calcAreaCos*100)/this.calcAreaTotal;
  }

  validarFrenteFondo():void{
    let medidaFr = this.areaConstruccionForm.get('retiroFrontal');
    let medidaFo = this.areaConstruccionForm.get('retiroPosterior');
    
    let sumaRetiros = parseFloat(medidaFr.value)+parseFloat(medidaFo.value);
    if(sumaRetiros>=this.calcFondo){
      this.areaConstruccionForm.controls['retiroFrontal'].setErrors({'errorFondo': true});      
      this.areaConstruccionForm.controls['retiroPosterior'].setErrors({'errorFondo': true});
    }else{
      this.areaConstruccionForm.controls['retiroFrontal'].setErrors({'errorFondo': null});      
      this.areaConstruccionForm.controls['retiroPosterior'].setErrors({'errorFondo': null});
      this.areaConstruccionForm.controls['retiroFrontal'].updateValueAndValidity();      
      this.areaConstruccionForm.controls['retiroPosterior'].updateValueAndValidity();
    }
  }

  validarlaterales():void{
    let medidaLI = this.areaConstruccionForm.get('retiroLateralIzquierdo');
    let medidaLD = this.areaConstruccionForm.get('retiroLateralDerecho');

    let sumaRetiros = parseFloat(medidaLI.value)+parseFloat(medidaLD.value);
    console.log(sumaRetiros)
    if(sumaRetiros>=this.calcFrente){
      this.areaConstruccionForm.controls['retiroLateralIzquierdo'].setErrors({'errorFondo': true});      
      this.areaConstruccionForm.controls['retiroLateralDerecho'].setErrors({'errorFondo': true});
    }else{
      this.areaConstruccionForm.controls['retiroLateralIzquierdo'].setErrors({'errorFondo': null});      
      this.areaConstruccionForm.controls['retiroLateralDerecho'].setErrors({'errorFondo': null});
      this.areaConstruccionForm.controls['retiroLateralIzquierdo'].updateValueAndValidity();      
      this.areaConstruccionForm.controls['retiroLateralDerecho'].updateValueAndValidity();
    }
  }

  changeTab():void{
    this.activeTabPlan = false;
    this.activeTab = 1;
  }

  enableTabPlan():void{
    this.activeTabPlan = false;
  }

  disableTabPlan():void{    
    this.activeTabPlan = true;    
  }

  changeTest(event):void{
    this.activeTab=event;
    if(event===1){
      console.log('VALIDAR PLAN DE NECESIDADES')
    }
  }

  //METODOS PARA PREFACTIBILIDAD
  savePrefactibilidad():void{

  }
  
  private _filter(val:string): Ambiente[]{  

    const formatVal = val.toLocaleLowerCase();
    return this.ambientes.filter(ambiente => {      
      return ambiente.nombre.toLocaleLowerCase().indexOf(formatVal)===0
    })
  }

  addElementTable(event:MatAutocompleteSelectedEvent):void{
    console.table(event.option.value)
  }


  displayedColumns = ['cantidad','ambiente', 'area', 'subtotal', 'acciones'];
  displayedColumnsAreas = ['emptyFooter','emptyFooter', 'areaParedes', 'subtotalParedes', 'emptyColorFooter'];
  displayedColumnsTotal = ['emptyFooter','emptyFooter', 'areaTotal', 'totalArea', 'emptyColorFooter'];
  transactions: Transaction[] = [
    {cant:1,item: 'Beach ball', cost: 4},
    {cant:2,item: 'Towel', cost: 5},
    {cant:3,item: 'Frisbee', cost: 2},
    {cant:4,item: 'Sunscreen', cost: 4},
    {cant:5,item: 'Cooler', cost: 25},
    {cant:4,item: 'Swim suit', cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


  getSubtotalArea(transaction:Transaction) {
    return transaction.cost * transaction.cant;
  }

  deleteElement(event):void{
    //borrar elemento de la tabla
  }

  onChangeCantity(event):void{
    //calcular area subtotal
  }

  createFormItems(): FormGroup {
    return this.formBuilder.group({
      cantidad : this.cantidad = new FormControl('', [Validators.required, Validators.min(1)]),      
    });
  }

  createOldFormItem(transaction:Transaction): FormGroup {
    return this.formBuilder.group({
      cantidad : this.cantidad = new FormControl(transaction.cant, [Validators.required, Validators.min(1)]),      
    });
  }

  createFormArrayItems(transactions:Transaction[]) {
    transactions.map((trans)=>{
      this.itemsPrefactibilidad.push(this.createOldFormItem(trans))
    })
  }

  get itemsPrefactibilidad(){
    return this.prefactibilidadForm.get('itemsPrefactibilidad') as FormArray;    
  }
}

export interface Transaction {
  cant:number;
  item: string;
  cost: number;
}