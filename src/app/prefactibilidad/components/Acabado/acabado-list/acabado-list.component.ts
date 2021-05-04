import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllAcabado } from 'src/app/prefactibilidad/actions';
import { TipoAcabado } from 'src/app/prefactibilidad/models/acabado';
import { AcabadoDeleteComponent } from '../acabado-delete/acabado-delete.component';
import { AcabadoDetailComponent } from '../acabado-detail/acabado-detail.component';

@Component({
  selector: 'app-acabado-list',
  templateUrl: './acabado-list.component.html',
  styleUrls: ['./acabado-list.component.scss']
})
export class AcabadoListComponent implements OnInit {
  
  public acabados:TipoAcabado[];
  acabadoSelected:TipoAcabado;
  action:string;
  displayedColumnsTable: string[] = ['id', 'nombre', 'costoAcabadoVivienda', 'actions']; 

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.store.select('prefactibilidadApp').subscribe(prefactStore=>
      this.acabados=prefactStore.acabados      
    );    
  }

  ngOnInit(): void {
    this.store.dispatch(getAllAcabado())
  }
  
  onSelectEdit(acabado: TipoAcabado): void {
    this.acabadoSelected = acabado;    
    this.action = 'Actualizar';
    this.openForm();
  }

  onSelectCreate(): void {
    this.acabadoSelected = new TipoAcabado();    
    this.action = 'Nuevo';
    this.openForm();
  }

  openForm() {
    const dialogRef = this.dialog.open(AcabadoDetailComponent, {
      id:'midialogo',          
      data: {acabado:this.acabadoSelected, title: this.action},
      panelClass: 'widthDialog'
    });
    
  }

  deleteElement(acabado:TipoAcabado){
    this.acabadoSelected = acabado;    
    const dialogRef = this.dialog.open(AcabadoDeleteComponent, {      
      data: {acabado:this.acabadoSelected},
      panelClass: 'widthDialog'
    });       
  }

}
