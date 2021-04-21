import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AppState } from './app.reducer';
import { cookieAuthentication } from './auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'wetch-app';  
  cookie=false;
  cookieValue='';

  constructor(
    private store:Store<AppState>,
    private cookieService: CookieService
  ){
    this.store.select('authApp').subscribe((response)=>{
      if(response.cookieAuthenticate){        
        this.cookie = true;
      }
    })
    this.cookieValue = this.cookieService.get('XSRF-TOKEN');
  }
  
  ngOnInit(): void {
        
    if(!this.cookie || !this.cookieValue){
      this.store.dispatch(cookieAuthentication())
    }
  }

  
}


