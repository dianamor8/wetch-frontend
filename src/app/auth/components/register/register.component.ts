import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { siginup } from '../../actions';
import { User } from '../../models/user';
import { AuthState } from '../../reducers';
import { checkEquality } from '../../validators/auth.validator';
import { MyAsyncValidator  } from "./../../validators/auth.async.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginState$: AuthState;
  registerForm: FormGroup;
  
  name: FormControl;
  email: FormControl;
  password: FormControl = null;
  confirm_password: FormControl = null;
  bSubmitted: boolean;
  hide = true;
  hidecp = true;

  constructor(
    private store:Store<AppState>,
    private formBuilder: FormBuilder, 
    private router: Router,
  ) {
    this.store.select('authApp').subscribe(login => this.loginState$ = login);
  }

  ngOnInit(): void {
    this.name = new FormControl('', [Validators.required, Validators.maxLength(240)]);
    this.email = new FormControl('', {validators:[Validators.required, Validators.email],updateOn: 'blur'}); //,updateOn: 'blur'}
    this.password = new FormControl('', [Validators.required, Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]);
    this.confirm_password = new FormControl('', [Validators.required]);
    this.registerForm = this.formBuilder.group({
      name:this.name,
      email:this.email,
      confirm_password: this.confirm_password,
      password:this.password
    },{validator:Validators.compose(
      [checkEquality])
    });        
    this.bSubmitted = false;
  }

  register():void{
    this.bSubmitted = true
    if(this.registerForm.valid){      
      const user = new User(this.registerForm.value);
      this.store.dispatch(siginup({user:user}));
    }
  }

}
