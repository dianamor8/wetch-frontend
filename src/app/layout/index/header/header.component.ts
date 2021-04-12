import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  user:User;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('authApp').subscribe(authResponse =>{
      this.user = authResponse.userAuth;
    })
  }

  public onToggleSidenav=()=>{
    this.sidenavToggle.emit();
  }

  public print(){
    
  }
}
