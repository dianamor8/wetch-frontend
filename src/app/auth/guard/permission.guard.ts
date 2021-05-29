import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from '../models/user';
import { getUser } from "./../selectors";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  user:User;
  constructor(
    private store:Store<AppState>,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select(getUser).subscribe(user=>{
        this.user= Object.assign(new User(), user)
        });
      let permission = route.data.permission;      
      if(!this.user.hasPermission(permission)){
        return false;
      }
    return true;
  }
  
}
