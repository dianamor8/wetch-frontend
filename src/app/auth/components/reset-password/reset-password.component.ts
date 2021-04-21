import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { resetPassword } from '../../actions';
import { AuthState } from '../../reducers';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: FormControl;
  resetPasswordForm:FormGroup;
  loginState$: AuthState;
  bSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private store:Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute,
  ) {
    this.store.select('authApp').subscribe(login => this.loginState$ = login);
  }
5
  ngOnInit(): void {
    this.email = new FormControl('', {validators:[Validators.required, Validators.email]});
    this.resetPasswordForm = this.formBuilder.group({
      email:this.email      
    }); 
    this.bSubmitted = false;
  }

  reset():void{
    this.bSubmitted = true;
    if(this.resetPasswordForm.valid){
      this.store.dispatch(resetPassword({email: this.resetPasswordForm.get('email').value}));
    }
  }

}
