import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { Prefactibilidad, Proyecto } from 'src/app/proyectos/models/proyecto';
import { ProyectosState } from 'src/app/proyectos/reducers';
import { getProyectoById } from 'src/app/proyectos/selectors';
import { PrefactibilidadDeleteComponent } from '../../Prefactibilidad/prefactibilidad-delete/prefactibilidad-delete.component';

@Component({
  selector: 'app-proyecto-estudios',
  templateUrl: './proyecto-estudios.component.html',
  styleUrls: ['./proyecto-estudios.component.scss']
})
export class ProyectoEstudiosComponent implements AfterViewInit, OnInit {
  
  proyectoState$:ProyectosState;  
  proyecto:Proyecto;

  user:User;
  id:number;

  displayedColumns: string[] = ['id', 'fecha', 'subtotalAreaConstruccion', 'areaTotalConstruccion', 'actions'];
  dataSource: MatTableDataSource<Prefactibilidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  prefactibilidadSelected:Prefactibilidad;

  constructor(
    private store:Store<AppState>,
    private route:ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
  ) {
    
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

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.paginator){
      this.paginator._intl.itemsPerPageLabel="Elementos por página";
    }    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((route)=>{
      this.id = +route.get('id');
    });
    
    //Si la lista de proyectos está vacía disparar get allproyects

    this.store.select(getProyectoById(this.id)).subscribe((proy:Proyecto)=>{
      this.proyecto = proy
      this.dataSource = new MatTableDataSource(this.proyecto.prefactibilidads);
    });        
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectEdit(prefactibilidad: Prefactibilidad): void {
    this.prefactibilidadSelected = prefactibilidad;    
    this.router.navigate(['proyectos/prefactibilidad-update',this.proyecto.id , this.prefactibilidadSelected.id])
  }

  deleteElement(prefactibilidad: Prefactibilidad){
    this.prefactibilidadSelected = prefactibilidad;    
    const dialogRef = this.dialog.open(PrefactibilidadDeleteComponent, {      
      data: {prefactibilidad:this.prefactibilidadSelected},
      panelClass: 'widthDialog'
    });       
  }
}
