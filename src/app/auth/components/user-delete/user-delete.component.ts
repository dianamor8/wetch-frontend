import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { statusUsersSystem } from '../../actions';
import { UserSystem } from '../../models/user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  @Input() userSystem:UserSystem;
  eliminar:FormControl;
  eliminarForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userSystem: UserSystem}
  ) { 
    this.userSystem = data.userSystem;
  }

  ngOnInit(): void {
    this.eliminar = new FormControl('',[Validators.required, Validators.pattern(/^\beliminar\b$/)] );
    this.eliminarForm = this.formBuilder.group({
      eliminar: this.eliminar
    })
  }

  delete():void{
    if(this.userSystem){
      if(this.eliminarForm.value){
        if(this.eliminarForm.get('eliminar').value === 'eliminar')        
        this.store.dispatch(statusUsersSystem({userSystem:this.userSystem}));
        this.dialogRef.close();
      }      
    }
  }

}
