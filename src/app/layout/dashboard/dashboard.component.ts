import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user:User
  
  constructor(
    private store:Store<AppState>
  ) {
    
   }

  ngOnInit(): void {
    this.store.select('authApp').subscribe(response=>{      
      if(response.userAuth){
        this.user = Object.assign(new User(), response.userAuth)
      }else{
        this.user = response.userAuth
      }
    })
  }

}
