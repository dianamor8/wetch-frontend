import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllProyectos } from 'src/app/proyectos/actions';
import { Provincia, Proyecto } from 'src/app/proyectos/models/proyecto';
import { ProyectosState } from 'src/app/proyectos/reducers';
import { ProyectosService } from 'src/app/proyectos/service/proyectos.service';
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

  constructor(
    private store:Store<AppState>,
    public dialog: MatDialog,
    private router:Router
  ) { 
    

    this.store.select('proyectosApp').subscribe(proyectosStore=>{
      this.proyectos = proyectosStore.proyectos;
      this.proyectosState$ = proyectosStore;      
    });    
  }

  ngOnInit(): void {
    this.store.dispatch(getAllProyectos());
  }

  deleteElement(proyecto: Proyecto){
    this.proyectoSelected = proyecto;    
    const dialogRef = this.dialog.open(ProyectoDeleteComponent, {      
      data: {proyecto:this.proyectoSelected},
      panelClass: 'widthDialog'
    });       
  }

  onSelectEdit(proyecto: Proyecto): void {
    this.proyectoSelected = proyecto;    
    this.router.navigate(['proyectos/proyecto', this.proyectoSelected.id]);
  }

  onAddEstudios(proyecto: Proyecto):void{
    this.proyectoSelected = proyecto;    
    this.router.navigate(['proyectos/proyecto-estudios', this.proyectoSelected.id]);
  }

}
