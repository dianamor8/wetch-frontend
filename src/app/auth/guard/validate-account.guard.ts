import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateAccountGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(route.queryParamMap.get('token')){        
        return this.authService.validateNewUser(route.queryParamMap.get('token')).pipe(
          map((x)=> {
            this.messageService.showNotification(x.message, 'Éxito','Ok', 'success', 20000);
            this.router.navigateByUrl('/login')
          }),          
          catchError(error=>{
                            this.messageService.showNotification(error.error.error, 'Error','Ok', 'error', 5000)
                            this.router.navigateByUrl('/reset-password');
                            return of(error)
                          })
        )
      }
      return true;
  }
  
}
