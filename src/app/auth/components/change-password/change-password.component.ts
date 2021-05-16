import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { changePassword } from '../../actions';
import { AuthState } from '../../reducers';
import { checkEquality } from '../../validators/auth.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loginState$: AuthState;
  changePasswordForm: FormGroup;
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
    this.password = new FormControl('', [Validators.required, Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]);
    this.confirm_password = new FormControl('', [Validators.required]);
    this.changePasswordForm = this.formBuilder.group({      
      confirm_password: this.confirm_password,
      password:this.password
    },{validator:Validators.compose(
      [checkEquality])
    });        
    this.bSubmitted = false;
  }
  
  change():void{
    this.bSubmitted = true;
    if(this.changePasswordForm.valid){ 
      this.store.dispatch(changePassword({password: this.changePasswordForm.get('password').value}))
    }
  }

}
