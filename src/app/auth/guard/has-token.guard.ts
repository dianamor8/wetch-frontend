import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { addToken } from '../actions';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasTokenGuard implements CanActivate {
  constructor(private store:Store<AppState>,
              private authService: AuthService,
              private messageService:MessageService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //VERIFICAR SI TOKEN ESTÁ ACTIVO PASAR A CAMBIAR CONTRASEÑA, SINO ESTE TOKEN YA SE HA USADO            
      let token = route.queryParamMap.get('token')
      if(token){        
        return this.authService.verifyToken(token).pipe(
          map((x)=> {
            this.store.dispatch(addToken({token:token}))
            return true;
          }),          
          catchError(error=>{
                            this.messageService.showNotification(error.error.error, 'Error','Ok', 'error', 5000)
                            this.router.navigateByUrl('/reset-password');
                            return of(error)
                          })
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
