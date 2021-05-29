import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { updateUsersSystem } from '../../actions';
import { UserSystem } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  @Input() userSystem:UserSystem;

  userSystemForm:FormGroup;
  name:FormControl;
  email:FormControl;
  admin:FormControl;
  planificador:FormControl;
  cliente:FormControl;
  constructor(
    private formBuilder:FormBuilder,
    private store:Store<AppState>
  ) {

   }

  ngOnInit(): void {
    
    this.name = new FormControl({value:this.userSystem.name, disabled:'true'}, [Validators.required]);
    this.email = new FormControl({value:this.userSystem.email, disabled:'true'});        
    this.admin = new FormControl(this.userSystem.admin);
    this.planificador = new FormControl(this.userSystem.planificador);
    this.cliente = new FormControl(this.userSystem.cliente);
    this.userSystemForm = this.formBuilder.group({
      name:this.name,
      email:this.email,
      admin: this.admin,
      planificador: this.planificador,
      cliente:this.cliente
    });  

    console.log(this.userSystem)
  }

  save():void{
    console.log('formulario');
    console.log(this.userSystemForm.value)
    let userSystemAux = {...this.userSystem}
    userSystemAux.admin = this.userSystemForm.get('admin').value;
    userSystemAux.planificador = this.userSystemForm.get('planificador').value;
    userSystemAux.cliente = this.userSystemForm.get('cliente').value;
    console.log('objeto')
    console.log(userSystemAux)
    this.store.dispatch(updateUsersSystem({userSystem:userSystemAux}))
  }
}
