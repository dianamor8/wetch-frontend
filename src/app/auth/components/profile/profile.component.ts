import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from '../../models/profile';
import { getProfile } from "src/app/auth/selectors";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { changePassword, updateProfile } from '../../actions';
import { checkEquality } from '../../validators/auth.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:Profile;
  profileForm: FormGroup;
  nombres:FormControl;
  apellidos:FormControl;
  telefono:FormControl;
  direccion:FormControl;

  changePasswordForm: FormGroup;
  password: FormControl = null;
  confirm_password: FormControl = null;

  hide = true;
  hidecp = true;
  bSubmitted: boolean;

  constructor(
    private store:Store<AppState>,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {    
    this.store.select(getProfile).subscribe((profile:Profile)=>{      
      this.profile = profile;
    });        
    
    this.nombres = new FormControl(this.profile.nombres, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);    
    this.apellidos = new FormControl(this.profile.apellidos, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);  
    this.telefono = new FormControl(this.profile.telefono, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);  
    this.direccion = new FormControl(this.profile.direccion, [Validators.required, Validators.maxLength(250), Validators.minLength(4)]);  
    this.profileForm = this.formBuilder.group({
      nombres: this.nombres,
      apellidos:this.apellidos,
      telefono: this.telefono,
      direccion:this.direccion
     });

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

  save():void{
    if(this.profileForm.valid){
      this.profile = {...this.profile, ...this.profileForm.value};
      this.store.dispatch(updateProfile({profile:this.profile}));
    }
  }

  change():void{
    this.bSubmitted = true;
    if(this.changePasswordForm.valid){ 
      this.store.dispatch(changePassword({password: this.changePasswordForm.get('password').value}))
    }
  }

}
