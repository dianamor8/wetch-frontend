import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-sidebar-def',
  templateUrl: './sidebar-def.component.html',
  styleUrls: ['./sidebar-def.component.scss']
})
export class SidebarDefComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  public user:User;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select("authApp").subscribe((response)=>{
      if(response.userAuth){
        this.user = Object.assign(new User(),response.userAuth);
      }else{
        this.user = response.userAuth;
      }
      
    })
  }

  public onSidenavClose = () =>{   
    console.log('sidebardef') 
    this.sidenavClose.emit();
  }

}
