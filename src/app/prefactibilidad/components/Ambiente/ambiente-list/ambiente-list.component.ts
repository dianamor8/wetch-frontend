import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllAmbiente } from 'src/app/prefactibilidad/actions';
import { Ambiente, AreaVivienda } from 'src/app/prefactibilidad/models/ambiente';
import { PrefactibilidadState } from 'src/app/prefactibilidad/reducers';
import { AreaViviendaComponent } from '../../AreaVivienda/area-vivienda.component';
import { AmbienteDeleteComponent } from '../ambiente-delete/ambiente-delete.component';

@Component({
  selector: 'app-ambiente-list',
  templateUrl: './ambiente-list.component.html',
  styleUrls: ['./ambiente-list.component.scss']
})
export class AmbienteListComponent implements AfterViewInit, OnInit{

  ambientes:Ambiente[];
  ambienteSelected: Ambiente;
  bSubmited:boolean;
  prefactibilidadState$: PrefactibilidadState;
  
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'areas', 'actions'];
  dataSource: MatTableDataSource<Ambiente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store:Store<AppState>,
    public dialog: MatDialog,
    private router:Router
  ) { 
    this.store.select('prefactibilidadApp').subscribe(prefactibilidadStore=>{
      this.ambientes = prefactibilidadStore.ambientes;
      this.prefactibilidadState$ = prefactibilidadStore;
      this.dataSource = new MatTableDataSource(this.ambientes);    
      this.ngAfterViewInit();  
    });    
   }

  ngOnInit(): void {
    this.store.dispatch(getAllAmbiente());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.paginator){
      this.paginator._intl.itemsPerPageLabel="Elementos por página";
    }    
  }

  onSelectEdit(ambiente: Ambiente): void {
    this.ambienteSelected = ambiente;    
    this.router.navigate(['prefactibilidad/ambiente', this.ambienteSelected.id])
  }

  deleteElement(ambiente: Ambiente){
    this.ambienteSelected = ambiente;    
    const dialogRef = this.dialog.open(AmbienteDeleteComponent, {      
      data: {ambiente:this.ambienteSelected},
      panelClass: 'widthDialog'
    });       
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onViewAreas(areas:AreaVivienda[]):void{
    const dialogRef = this.dialog.open(AreaViviendaComponent, {      
      data: {areasVivienda:areas},
      panelClass: 'widthDialog'
    }); 
  }



}
