import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private store:Store<AppState>,
              private router:Router){}

  // getFromStoreOrAPI(): Observable<any> {

  //   return this.store.select("authApp").do((data:any)=>{
  //     if(!data.userAuth){ //se consulta los datos 

  //     }
  //   });
  // }

  //ACTIVA LA RUTA SI EL USUARIO ESTÁ LOGEADO



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

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
