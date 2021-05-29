import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { statusUsersSystem } from '../../actions';
import { UserSystem } from '../../models/user';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.scss']
})
export class UserActiveComponent implements OnInit {

  @Input() userSystem:UserSystem;
  activar:FormControl;
  activarForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<UserActiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userSystem: UserSystem}
  ) { 
    this.userSystem = data.userSystem;
  }

  ngOnInit(): void {
    this.activar = new FormControl('',[Validators.required, Validators.pattern(/^\bactivar\b$/)] );
    this.activarForm = this.formBuilder.group({
      activar: this.activar
    })
  }

  active():void{
    if(this.userSystem){
      if(this.activarForm.value){
        if(this.activarForm.get('activar').value === 'activar')        
        this.store.dispatch(statusUsersSystem({userSystem:this.userSystem}));
        this.dialogRef.close();
      }      
    }
  }
}
