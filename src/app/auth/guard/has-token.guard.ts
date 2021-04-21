import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasTokenGuard implements CanActivate {
  constructor(private store:Store<AppState>,
              private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //VERIFICAR SI TOKEN ESTÁ ACTIVO PASAR A CAMBIAR CONTRASEÑA, SINO ESTE TOKEN YA SE HA USADO            
      if(route.queryParamMap.get('token')){        
        return this.authService.verifyToken(route.queryParamMap.get('token')).pipe(
          map((x)=> {console.log('EL TOKEN ES VALIDO'+x);
          return true;}),
          catchError(error=>of(error))
        )
      }else{
        this.store.select("authApp").subscribe((resp)=>{
          if(resp.userAuth){          
            return true;
          }
        });
      }
      return false;
  }
  
}
