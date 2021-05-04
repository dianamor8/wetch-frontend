import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { cookieAuthentication } from '../actions';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InicializationGuard implements CanActivate {
  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private store:Store<AppState>,
              private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select("authApp").subscribe((resp)=>{
        if(resp.userAuth){          
          return this.router.navigate(['/dashboard']); //.then(() => false);
        }else{
          return true;
        }
      })
    return true;
  }

}
