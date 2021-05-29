import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { getAllAcabado, getAllAmbiente, getAllTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAcabado } from 'src/app/prefactibilidad/models/acabado';
import { Ambiente } from 'src/app/prefactibilidad/models/ambiente';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';
import { getTipoAcabadoById, getTipoAreaViviendaById } from 'src/app/prefactibilidad/selectors';
import { minLengthArray } from 'src/app/prefactibilidad/validators/prefact.validator';
import { AreaConstruccion, ItemPrefactibilidad, Prefactibilidad, Proyecto } from 'src/app/proyectos/models/proyecto';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { FindAmbienteComponent } from '../find-ambiente/find-ambiente.component';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {

  proyecto:Proyecto;
  prefactibilidadState$: PrefactibilidadState;
  tiposAreaVivienda: TipoAreaVivienda[];
  tiposAcabado: TipoAcabado[];
  ambientes: Ambiente[];

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

  // PREFACTIBILIDAD FORM
  prefactibilidadForm: FormGroup;
  valorSueloUrbano: FormControl;
  tipoAreaVivenda: FormControl;
  tipoAcabado: FormControl;
  cantidad: FormControl;
  itemsPrefactibilidadTable: ItemPrefactibilidad[] = [];
  calcAreaSubtotalPrefact: number = 0;
  calcAreaCirculacionPrefact: number = 0;
  calcAreaTotalPrefact: number = 0;
  calcSumatoriaAreaSubtotal : number = 0;
  calcSumatoriaAreaCirulacion : number = 0;
  calcSumatoriaAreaTotalConstruccion : number = 0;

  activeTab: number = 0;
  activeTabPlan: boolean = true; 
  calcAreaTotal: number = 0;
  calcFrente: number = 0;
  calcFondo: number = 0;
  calcAreaRetiros: number = 0;
  calcAreaCos: number = 0;
  calcPorcentajeArea: number = 0;
  aRegular: boolean = true;
  message: boolean = false;

  displayedColumns = ['cantidad', 'ambiente', 'area', 'subtotal', 'acciones'];
  displayedColumnsAreas = [
    'emptyFooter',
    'emptyFooter',
    'areaParedes',
    'subtotalParedes',
    'emptyColorFooter',
  ];
  displayedColumnsTotal = [
    'emptyFooter',
    'emptyFooter',
    'areaTotal',
    'totalArea',
    'emptyColorFooter',
  ];

  //OBJECTS
  areaConstruccion:AreaConstruccion;
  prefactibilidad:Prefactibilidad;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,        
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) {
    
    this.store.select('prefactibilidadApp').subscribe((prefactStore) => {
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

    this.proyecto=new Proyecto();
    this.proyecto.titulo = 'Simulador de prefactibilidad';
    this.proyecto.fecha = new Date();
    this.proyecto.solicitante = this.user.name;
    this.proyecto.id = 1;

    if (this.prefactibilidadState$.tipoAreaViviendas.length === 0) {
      this.store.dispatch(getAllTipoAreaVivienda());
    }

    if (this.prefactibilidadState$.acabados.length === 0) {
      this.store.dispatch(getAllAcabado());
    }

    if (this.prefactibilidadState$.ambientes.length === 0) {
      this.store.dispatch(getAllAmbiente());
    } 

    this.retiroFrontal = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.retiroPosterior = new FormControl('0.00', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.retiroLateralDerecho = new FormControl(
      '0.00',
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+\.\d{2}$/),
      ]
    );
    this.retiroLateralIzquierdo = new FormControl(
      '0.00',
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
    this.areaTotal = new FormControl( '0.00', [
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

    this.valorSueloUrbano = new FormControl( '0.00', [
      Validators.required,
      Validators.min(0.1),
      Validators.pattern(/^\d+\.\d{2}$/),
    ]);
    this.tipoAreaVivenda = new FormControl( '', [Validators.required]);
    this.tipoAcabado = new FormControl( '', [Validators.required]);

    this.prefactibilidadForm = this.formBuilder.group({
      valorSueloUrbano: this.valorSueloUrbano,
      tipoAreaVivienda: this.tipoAreaVivenda,
      tipoAcabado: this.tipoAcabado,
      itemsPrefactibilidad: this.formBuilder.array([], minLengthArray(1)),
    });

    this.createFormArrayItems(this.itemsPrefactibilidadTable);
  }

  get itemsPrefactibilidad() {
    return this.prefactibilidadForm.get('itemsPrefactibilidad') as FormArray;
  }

  createFormArrayItems(items: ItemPrefactibilidad[]) {
    items.map((item) => {
      this.itemsPrefactibilidad.push(this.createOldFormItem(item));
    });
  }

  createOldFormItem(item: ItemPrefactibilidad): FormGroup {
    return this.formBuilder.group({
      cantidad: (this.cantidad = new FormControl(item.cantidad, [
        Validators.required,
        Validators.min(1),
      ])),
    });
  }

  changeTest(event): void {        
    this.activeTab = event;    
  }

  disableTabPlan(): void {
    this.activeTabPlan = true;
  }

  enableTabPlan(): void {
    this.activeTabPlan = false;
  }

  changeTab(): void {
    this.activeTabPlan = false;
    this.activeTab = 1;
  }

  changeCombo(event): void {
    if (event.value === '1') {
      this.aRegular = true;
    } else {
      this.aRegular = false;
    }    
  }

  calcularAreaTotal(frente: number, fondo: number): number {
    return frente * fondo;
  }

  // SUMA DE AREAS DE RETIROS
  calcularRetiros(
    rfrontal: number,
    rposterior: number,
    rlateralD: number,
    rlateralI: number,
    frente: number,
    fondo: number
  ): number {
    let sumaAreas =
      rfrontal * frente +
      rposterior * frente +
      rlateralD * fondo +
      rlateralI * fondo;
    return sumaAreas;
  }

  calcularRetirosForm(): number {
    let retiroF = this.areaConstruccionForm.get('retiroFrontal').value;
    let retiroP = this.areaConstruccionForm.get('retiroPosterior').value;
    let retiroLI = this.areaConstruccionForm.get(
      'retiroLateralIzquierdo'
    ).value;
    let retiroLD = this.areaConstruccionForm.get('retiroLateralDerecho').value;
    return this.calcularRetiros(
      retiroF,
      retiroP,
      retiroLD,
      retiroLI,
      this.calcFrente,
      this.calcFondo
    );
  }

  saveAreaConstruccion(): void {
    if (this.calcAreaCos > 0) {
      this.changeTab();
      //VALIDAR PLAN DE NECESIDADES
    } else {
      this.messageService.showNotification(
        'El Coeficiente de ocupación del suelo no puede ser negativo o cero',
        'Precaución',
        'Ok',
        'warning',
        4000
      );
      this.disableTabPlan();
    }
  }

  retiros_event(event): void {
    let medidaFr = this.areaConstruccionForm.get('medidaFrente');
    let medidaFo = this.areaConstruccionForm.get('medidaFondo');
    if (
      medidaFr.valid &&
      medidaFo.valid &&
      parseFloat(medidaFr.value) > 0 &&
      parseFloat(medidaFo.value) > 0
    ) {
      this.calcAreaTotal = this.calcularAreaTotal(
        parseFloat(medidaFr.value),
        parseFloat(medidaFo.value)
      );
      this.calcFrente = parseFloat(medidaFr.value);
      this.calcFondo = parseFloat(medidaFo.value);
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      this.enableRetiros();
      if (this.calcPorcentajeArea <= 60) {
        this.message = true;
      }
      this.validarAreas();
    } else {
      this.calcAreaTotal = 0;
      this.calcAreaCos = 0;
      this.calcPorcentajeArea = 0;
      this.calcFrente = 0;
      this.calcFondo = 0;
      this.message = false;
      this.disableRetiros();
    }
  }

  calcularCOS(): void {
    this.calcAreaCos = this.calcAreaTotal - this.calcAreaRetiros;
    this.calcPorcentajeArea = (this.calcAreaCos * 100) / this.calcAreaTotal;
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

  validarAreas(): void {
    // VERIFICA SI EL ÁREA DE LOS RETIROS ES MAYOR QUE EL AREA INGRESADA
    if (this.calcAreaRetiros >= this.calcAreaTotal) {
      if (this.aRegular) {
        this.areaConstruccionForm.controls['medidaFrente'].setErrors({
          incorrect: true,
        });
      } else {
        this.areaConstruccionForm.controls['areaTotal'].setErrors({
          incorrect: true,
        });
      }
      this.disableTabPlan();
    } else {
      //SI ES MENOR QUE CERO AGREGAR UN ERROR SINO DAR PASO 236 HASTA 242
      if (this.aRegular) {
        this.areaConstruccionForm.controls['medidaFrente'].setErrors({
          incorrect: null,
        });
        this.areaConstruccionForm.controls[
          'medidaFrente'
        ].updateValueAndValidity();
      } else {
        this.areaConstruccionForm.controls['areaTotal'].setErrors({
          incorrect: null,
        });
        this.areaConstruccionForm.controls[
          'areaTotal'
        ].updateValueAndValidity();
      }
      this.enableTabPlan();
    }
  }

  retiros_irregular_event(event): void {
    let medidaFoF = this.areaConstruccionForm.get('frente_o_fondo');
    let medidaAt = this.areaConstruccionForm.get('areaTotal');

    if (
      medidaFoF.valid &&
      medidaAt.valid &&
      parseFloat(medidaFoF.value) > 0 &&
      parseFloat(medidaAt.value) > 0
    ) {
      this.calcAreaTotal = parseFloat(medidaAt.value);
      this.calcFrente = parseFloat(medidaFoF.value);
      this.calcFondo = this.calcAreaTotal / parseFloat(medidaFoF.value);
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      this.enableRetiros();
      if (this.calcPorcentajeArea <= 60) {
        this.message = true;
      }
      this.validarAreas();
    } else {
      this.calcAreaTotal = 0;
      this.calcAreaCos = 0;
      this.calcPorcentajeArea = 0;
      this.calcFrente = 0;
      this.calcFondo = 0;
      this.message = false;
      this.disableRetiros();
    }
  }

  calcularAreaRetiros(event): void {
    if (this.validarCamposRetiro) {
      this.calcAreaRetiros = this.calcularRetirosForm();
      this.calcularCOS();
      if (this.calcPorcentajeArea <= 60) {
        this.message = true;
      } else {
        this.message = false;
      }
      this.validarAreas();
      this.validarFrenteFondo();
      this.validarlaterales();
    }
  }

  validarCamposRetiro(): boolean {
    let retiroF = this.areaConstruccionForm.get('retiroFrontal');
    let retiroP = this.areaConstruccionForm.get('retiroPosterior');
    let retiroLI = this.areaConstruccionForm.get('retiroLateralIzquierdo');
    let retiroLD = this.areaConstruccionForm.get('retiroLateralDerecho');
    if (retiroF.valid && retiroP.valid && retiroLI.valid && retiroLD.valid) {
      return true;
    } else {
      return false;
    }
  }

  validarFrenteFondo(): void {
    let medidaFr = this.areaConstruccionForm.get('retiroFrontal');
    let medidaFo = this.areaConstruccionForm.get('retiroPosterior');

    let sumaRetiros = parseFloat(medidaFr.value) + parseFloat(medidaFo.value);
    if (sumaRetiros >= this.calcFondo) {
      this.areaConstruccionForm.controls['retiroFrontal'].setErrors({
        errorFondo: true,
      });
      this.areaConstruccionForm.controls['retiroPosterior'].setErrors({
        errorFondo: true,
      });
    } else {
      this.areaConstruccionForm.controls['retiroFrontal'].setErrors({
        errorFondo: null,
      });
      this.areaConstruccionForm.controls['retiroPosterior'].setErrors({
        errorFondo: null,
      });
      this.areaConstruccionForm.controls[
        'retiroFrontal'
      ].updateValueAndValidity();
      this.areaConstruccionForm.controls[
        'retiroPosterior'
      ].updateValueAndValidity();
    }
  }
  validarlaterales(): void {
    let medidaLI = this.areaConstruccionForm.get('retiroLateralIzquierdo');
    let medidaLD = this.areaConstruccionForm.get('retiroLateralDerecho');

    let sumaRetiros = parseFloat(medidaLI.value) + parseFloat(medidaLD.value);
    // console.log(sumaRetiros);
    if (sumaRetiros >= this.calcFrente) {
      this.areaConstruccionForm.controls['retiroLateralIzquierdo'].setErrors({
        errorFondo: true,
      });
      this.areaConstruccionForm.controls['retiroLateralDerecho'].setErrors({
        errorFondo: true,
      });
    } else {
      this.areaConstruccionForm.controls['retiroLateralIzquierdo'].setErrors({
        errorFondo: null,
      });
      this.areaConstruccionForm.controls['retiroLateralDerecho'].setErrors({
        errorFondo: null,
      });
      this.areaConstruccionForm.controls[
        'retiroLateralIzquierdo'
      ].updateValueAndValidity();
      this.areaConstruccionForm.controls[
        'retiroLateralDerecho'
      ].updateValueAndValidity();
    }
  }

  onChangeTipoArea(event):void{
    this.itemsPrefactibilidadTable =  this.itemsPrefactibilidadTable.map((item)=>{
      let nuevaArea = item.ambiente.areas.find(area => {        
        return area.tipoAreaVivienda.id === parseInt(event);
      });            
      if(nuevaArea != undefined){
        let nuevoItem = {...item}
        nuevoItem.areaVivienda = nuevaArea;
        nuevoItem.subtotal = nuevaArea.area * nuevoItem.cantidad;        
        return nuevoItem;
      }else{
        return item;
      }      
    });
  }

  bucarItem():void{
    this.openForm();
  }

  changeTabOne(): void {    
    this.activeTab = 0;
  }

  openForm() {

    let ambientesSeleccionados = this.itemsPrefactibilidadTable.map(item=>item.ambiente.id);   

    const dialogRef = this.dialog.open(FindAmbienteComponent, {
      id:'midialogo',          
      data: {
        ambientes:this.ambientes, 
        tipoArea: this.prefactibilidadForm.get('tipoAreaVivienda').value,
        ambientesSeleccionados: ambientesSeleccionados
      },
      panelClass: 'ambienteFindDialog'
    });

    dialogRef.afterClosed().subscribe((result:Ambiente[])=>{      
      if(typeof(result)!= 'string'){
        this.agregarItemsSeleccionados(result);      
      }      
    });
  }

  agregarItemsSeleccionados(ambientes: Ambiente[]):void{
    if(ambientes){
      ambientes.forEach(ambiente => {
        this.agregarItem(ambiente);
      });
    }    
  }

  agregarItem(nuevoAmbiente:Ambiente):void{    
    let nreItem = new ItemPrefactibilidad();    
    nreItem.id=this.itemsPrefactibilidadTable.length+1;    
    nreItem.cantidad=1;
    nreItem.areaVivienda = nuevoAmbiente.areas.find(area => {        
      return area.tipoAreaVivienda.id === parseInt(this.prefactibilidadForm.get('tipoAreaVivienda').value)
    });    
    nreItem.subtotal = nreItem.areaVivienda.area * nreItem.cantidad;
    nreItem.ambiente = nuevoAmbiente;
      
    this.itemsPrefactibilidad.push(this.createOldFormItem(nreItem));            
    this.itemsPrefactibilidadTable=[...this.itemsPrefactibilidadTable, nreItem];          
  }

  onChangeCantity(event, item: ItemPrefactibilidad, index:number): void {    
    // console.log(index)
    if (!isNaN(event) && typeof event === 'number') {
      if (event <= item.ambiente.cantidad) {
        this.itemsPrefactibilidad.controls[index].get('cantidad').setErrors({
          errorCantidad: null,
        });
        this.itemsPrefactibilidadTable = [...this.itemsPrefactibilidadTable.map(
          (it) => {
            if (it.id === item.id) { 
              
              let newitem = {...item}              
              newitem.cantidad = event;
              newitem.subtotal = event * newitem.areaVivienda.area;
              return newitem;
            }
            return it;
          }
        )];
        this.changeDetectorRefs.detectChanges();                        
      } else {
        this.itemsPrefactibilidad.controls[index].get('cantidad').setErrors({
          errorCantidad: true,
        });
      }
    }
  }

  getTotalSubtotalArea() {
    this.calcSumatoriaAreaSubtotal = this.itemsPrefactibilidadTable
      .map((t) => t.subtotal)
      .reduce((acc, value) => acc + value, 0);
    
    return this.calcSumatoriaAreaSubtotal;
  }

  deleteElement(item:ItemPrefactibilidad, index): void {
    //borrar elemento de la tabla
    this.itemsPrefactibilidadTable.splice(index, 1);
    this.itemsPrefactibilidadTable = this.itemsPrefactibilidadTable.map(
      (it) => {
        if (it.id != item.id) {                        
          return it;
        }
      }
    ); 
    this.itemsPrefactibilidad.removeAt(index); 
  }

  getAreaCirculacion():number{
    let tipoAreaVivienda:TipoAreaVivienda;
    let idTipoAreaVivienda = parseInt(this.prefactibilidadForm.get('tipoAreaVivienda').value)
    if(idTipoAreaVivienda){
      this.store.select(getTipoAreaViviendaById(idTipoAreaVivienda)).subscribe((t: TipoAreaVivienda) => (tipoAreaVivienda = t));    
      this.calcSumatoriaAreaCirulacion = this.calcSumatoriaAreaSubtotal * tipoAreaVivienda.factorCirculacionParedes;
    }    
    return this.calcSumatoriaAreaCirulacion;
  }

  getAreaTotal():number{
    this.calcSumatoriaAreaTotalConstruccion = this.calcSumatoriaAreaSubtotal + this.calcSumatoriaAreaCirulacion;
    return this.calcSumatoriaAreaTotalConstruccion;
  }

  guardarDatos():void{
      
    if(this.areaConstruccionForm.valid  && this.prefactibilidadForm.valid){

      this.areaConstruccion = new AreaConstruccion();
      this.prefactibilidad = new Prefactibilidad();
      
      this.areaConstruccion.areaTotal = this.calcAreaTotal;
      this.areaConstruccion.medidaFrente = this.calcFrente;
      this.areaConstruccion.medidaFondo = this.calcFondo;
      this.areaConstruccion.retiroFrontal = parseFloat(this.areaConstruccionForm.get('retiroFrontal').value);
      this.areaConstruccion.retiroPosterior = parseFloat(this.areaConstruccionForm.get('retiroPosterior').value);
      this.areaConstruccion.retiroLateralIzquierdo = parseFloat(this.areaConstruccionForm.get('retiroLateralIzquierdo').value);
      this.areaConstruccion.retiroLateralDerecho = parseFloat(this.areaConstruccionForm.get('retiroLateralDerecho').value);      
      this.areaConstruccion.areaCOS = this.calcAreaCos;
      this.areaConstruccion.cos = this.calcPorcentajeArea;
      this.areaConstruccion.valorSueloUrbano = parseFloat(this.prefactibilidadForm.get('valorSueloUrbano').value);
      this.areaConstruccion.costoTotalTerreno = this.calcAreaTotal * this.areaConstruccion.valorSueloUrbano;
      
      this.prefactibilidad.fecha = new Date();
      this.prefactibilidad.propietario = this.user;    
      
      let tipoAreaVivienda:TipoAreaVivienda;
      this.store.select(getTipoAreaViviendaById(parseInt(this.prefactibilidadForm.get('tipoAreaVivienda').value))).subscribe((tipo)=>tipoAreaVivienda = tipo);    
      this.prefactibilidad.typeArea = tipoAreaVivienda;
      this.prefactibilidad.areaCirculacionParedes = this.calcSumatoriaAreaCirulacion;
      this.prefactibilidad.subtotalAreaConstruccion = this.calcSumatoriaAreaSubtotal;
      this.prefactibilidad.areaTotalConstruccion = this.calcSumatoriaAreaTotalConstruccion;
      this.prefactibilidad.areaConstruccion = this.areaConstruccion;
      this.prefactibilidad.nroPlantas = this.prefactibilidad.areaTotalConstruccion/this.areaConstruccion.areaCOS;
      
      
      let tipoAcabado:TipoAcabado;
      this.store.select(getTipoAcabadoById(parseInt(this.prefactibilidadForm.get('tipoAcabado').value))).subscribe((tipo)=>tipoAcabado = tipo);    
      this.prefactibilidad.acabado = tipoAcabado;
      this.prefactibilidad.items = this.itemsPrefactibilidadTable;   
      
      this.prefactibilidad.costoConstruccion = this.prefactibilidad.areaTotalConstruccion*this.prefactibilidad.acabado.costoAcabadoVivienda;
      this.prefactibilidad.costoDireccionTecnica = this.prefactibilidad.costoConstruccion*this.prefactibilidad.typeArea.factorDireccionTecnica;
      this.prefactibilidad.costoTotalConstruccion = this.prefactibilidad.costoConstruccion + this.prefactibilidad.costoDireccionTecnica;

      
      /*Costo de estudios --ECUACION LOGARITMICA--->wilson Tapia 2019
        Hasta 3 pisos  area menor a 450m2  y = -5.412ln(x) + 45.601
        Mas de 3 pisos && area mayor a 450 m2. y = -0.526ln(x) + 17.646
        */

        if (this.prefactibilidad.areaTotalConstruccion <= 450 && this.prefactibilidad.nroPlantas <= 3) {
          this.prefactibilidad.costoEstudioPorMetro = (-5.412 * Math.log(this.prefactibilidad.areaTotalConstruccion) + 45.601) ;
          this.prefactibilidad.costoEstudios = this.prefactibilidad.costoEstudioPorMetro * this.prefactibilidad.areaTotalConstruccion * 1.22;    // incluye 12% de iva + 10% negociación
        }else{
          this.prefactibilidad.costoEstudioPorMetro = (-0.526 * Math.log(this.prefactibilidad.areaTotalConstruccion) + 17.646);
          this.prefactibilidad.costoEstudios = this.prefactibilidad.costoEstudioPorMetro * this.prefactibilidad.areaTotalConstruccion * 1.22;   // incluye 12% de iva + 10% negociación
        }
      
        this.prefactibilidad.inversionTotal = this.prefactibilidad.areaConstruccion.costoTotalTerreno+this.prefactibilidad.costoTotalConstruccion+this.prefactibilidad.costoEstudios;      
        this.prefactibilidad.proyecto = this.proyecto.id;      
        
        this.activeTab = 2;
       
    }
  }
}
