import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { login } from '../../actions';
import { AuthState } from '../../reducers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0.2
      })),
      transition('void <=> *', animate(100)),
    ])
  ]
})
export class LoginComponent implements OnInit {

  email: FormControl;
  password: FormControl;
  loginForm:FormGroup;

  returnUrl:string;
  loginState$: AuthState;
  bSubmitted: boolean;
  hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private store:Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute,    
  ) { 
    this.store.select('authApp').subscribe(login => this.loginState$ = login);
  }

  ngOnInit(): void {
    this.email = new FormControl('mor8diana@wetch.com', [Validators.required, Validators.email]);
    this.password = new FormControl('Mdiana1105', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email:this.email,
      password:this.password
    });    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.bSubmitted = false;
  }

  logIn():void{
    this.bSubmitted = true
    if(this.loginForm.valid){ 
      this.store.dispatch(login({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value }));
    }
    this.store.select('authApp').subscribe((response)=>
      {this.router.navigateByUrl(this.returnUrl);}
    )
  }   

}
