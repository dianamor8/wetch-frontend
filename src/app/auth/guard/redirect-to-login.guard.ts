import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RedirectToLoginGuard implements CanActivate {
  
  constructor(private store:Store<AppState>,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select("authApp").subscribe((response)=>{
        if(response.userAuth){ 
          return true
        }else{
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
    return true;
  }  
  
}
