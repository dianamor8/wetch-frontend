import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllProyectos } from 'src/app/proyectos/actions';
import { Proyecto } from 'src/app/proyectos/models/proyecto';
import { ProyectosState } from 'src/app/proyectos/reducers';
import { ProyectoDeleteComponent } from '../proyecto-delete/proyecto-delete.component';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.scss']
})
export class ProyectoListComponent implements OnInit {

  proyectos:Proyecto[];
  proyectoSelected:Proyecto;
  bSubmited:boolean;
  proyectosState$:ProyectosState;

  displayedColumns: string[] = ['id', 'titulo', 'fecha', 'actions'];
  dataSource: MatTableDataSource<Proyecto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store:Store<AppState>,
    public dialog: MatDialog,
    private router:Router
  ) { 
    this.store.select('proyectosApp').subscribe(proyectosStore=>{
      this.proyectos = proyectosStore.proyectos;
      this.proyectosState$ = proyectosStore;
      this.dataSource = new MatTableDataSource(this.proyectos);    
      this.ngAfterViewInit();  
    });    
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProyectos());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.paginator){
      this.paginator._intl.itemsPerPageLabel="Elementos por página";
    }    
  }

  onSelectEdit(proyecto: Proyecto): void {
    this.proyectoSelected = proyecto;    
    this.router.navigate(['proyectos/proyecto', this.proyectoSelected.id])
  }

  deleteElement(proyecto: Proyecto){
    this.proyectoSelected = proyecto;    
    const dialogRef = this.dialog.open(ProyectoDeleteComponent, {      
      data: {proyecto:this.proyectoSelected},
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
}
