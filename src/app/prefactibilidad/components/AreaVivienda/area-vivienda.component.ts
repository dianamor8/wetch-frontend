import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaVivienda } from '../../models/ambiente';

@Component({
  selector: 'app-area-vivienda',
  templateUrl: './area-vivienda.component.html',
  styleUrls: ['./area-vivienda.component.scss']
})
export class AreaViviendaComponent implements OnInit {

  @Input() areasVivienda: AreaVivienda[];

  constructor(
    public dialogRef: MatDialogRef<AreaViviendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {areasVivienda: AreaVivienda[]}
  ) { 
    this.areasVivienda = data.areasVivienda;
  }

  ngOnInit(): void {
  }

  close():void{
      this.dialogRef.close();    
  }
}
