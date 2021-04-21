import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
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
              private store:Store<AppState>){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // if(!this.cookieService.get('')){
      //   this.authService.loginBackend().pipe(
      //     tap(x=>{console.log(x)})
      //   )
      // }

      // this.authService.loginBackend().pipe(
      //   tap(x=>{console.log(x + ">>>>>>>>"); return true}),
      // )
      return true      
      
  }
  
}
