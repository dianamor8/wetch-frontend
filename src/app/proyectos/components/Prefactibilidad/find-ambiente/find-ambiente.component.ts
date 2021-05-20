import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/prefactibilidad/models/ambiente';

@Component({
  selector: 'app-find-ambiente',
  templateUrl: './find-ambiente.component.html',
  styleUrls: ['./find-ambiente.component.scss']
})
export class FindAmbienteComponent implements AfterViewInit, OnInit {

  ambientes:Ambiente[]=[];
  displayedColumns: string[] = ['select', 'id', 'nombre', 'areas'];
  dataSource = new MatTableDataSource<Ambiente>();
  selection = new SelectionModel<Ambiente>(true, []);
  tipoAreaViviendaId:number; 
  ambientesSeleccionados:number[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<FindAmbienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {ambientes:Ambiente[], tipoArea:string, ambientesSeleccionados:number[]}
  ){
    this.tipoAreaViviendaId = parseInt(data.tipoArea);    
    this.ambientesSeleccionados = data.ambientesSeleccionados;
    this.ambientes = data.ambientes.filter(amb => {
      let areas = amb.areas.filter(area=> area.tipoAreaVivienda.id === this.tipoAreaViviendaId);      
      return areas.length === 0 || this.ambientesSeleccionados.includes(amb.id) ? false: true;      
    });      
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.paginator){
      this.paginator._intl.itemsPerPageLabel="Elementos por página";
    }    
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Ambiente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnInit():void{    
    this.dataSource = new MatTableDataSource(this.ambientes); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(ambiente:Ambiente):string{
    let area= ambiente.areas.find(area => area.tipoAreaVivienda.id === this.tipoAreaViviendaId);
    return `${area.tipoAreaVivienda.nombre}: ${area.area}`
  }
}
