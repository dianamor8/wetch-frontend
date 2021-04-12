import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { login } from '../../actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl;
  password: FormControl;
  loginForm:FormGroup;


  constructor(
    private formBuilder: FormBuilder, 
    private store:Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('mor8diana@wetch.com', [Validators.required, Validators.email]);
    this.password = new FormControl('Mdiana1105', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email:this.email,
      password:this.password
    });
  }

  logIn():void{
    if(this.loginForm.valid){ 
      this.store.dispatch(login({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value }));
    }
    
    this.store.select("authApp").subscribe((resp)=>{
      if(resp.error){
        console.log('Las credenciales de acceso son incorrectas')
      }else{
        console.log('Bienvenido...');
        this.router.navigate(['/dashboard']);            
      }      
    })
  }   

}
