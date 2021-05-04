import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllTipoAreaVivienda } from 'src/app/prefactibilidad/actions';
import { TipoAreaVivienda } from 'src/app/prefactibilidad/models/tipo-area-vivienda';
import { TipoAreaViviendaDeleteComponent } from '../tipo-area-vivienda-delete/tipo-area-vivienda-delete.component';
import { TipoAreaViviendaDetailComponent } from '../tipo-area-vivienda-detail/tipo-area-vivienda-detail.component';

@Component({
  selector: 'app-tipo-area-vivienda-list',
  templateUrl: './tipo-area-vivienda-list.component.html',
  styleUrls: ['./tipo-area-vivienda-list.component.scss']
})
export class TipoAreaViviendaListComponent implements OnInit{

  index=1;
  public tipoAreaViviendas:TipoAreaVivienda[];
  tipoAreaViviendaSelected:TipoAreaVivienda;
  action:string;
  displayedColumnsTable: string[] = ['id', 'name', 'factorCirculacionParedes', 'factorDireccionTecnica', 'actions'];
  // dataSource:MatTableDataSource<TipoAreaVivienda>;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.store.select('prefactibilidadApp').subscribe(prefactStore=>
      this.tipoAreaViviendas=prefactStore.tipoAreaViviendas      
    );    
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTipoAreaVivienda())
  }
  
  onSelectEdit(tipoAreaVivienda: TipoAreaVivienda): void {
    this.tipoAreaViviendaSelected = tipoAreaVivienda;    
    this.action = 'Actualizar';
    this.openForm();
  }

  onSelectCreate(): void {
    this.tipoAreaViviendaSelected = new TipoAreaVivienda();    
    this.action = 'Nuevo';
    this.openForm();
  }

  openForm() {
    const dialogRef = this.dialog.open(TipoAreaViviendaDetailComponent, {
      id:'midialogo',          
      data: {tipoAreaVivienda:this.tipoAreaViviendaSelected, title: this.action},
      panelClass: 'widthDialog'
    });
    
  }

  deleteElement(tipoAreaVivienda:TipoAreaVivienda){
    this.tipoAreaViviendaSelected = tipoAreaVivienda;    
    const dialogRef = this.dialog.open(TipoAreaViviendaDeleteComponent, {      
      data: {tipoAreaVivienda:this.tipoAreaViviendaSelected},
      panelClass: 'widthDialog'
    });       
  }


  
}
