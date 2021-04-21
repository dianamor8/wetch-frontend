import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as authAccions from '../actions';
import { loginError } from '../actions';
import { AuthService } from '../services/auth.service';
import { mergeMap, map, catchError, find, tap, filter, exhaustMap, switchMap, delay, take } from 'rxjs/operators';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { environment } from "./../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {
    
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService:MessageService
        ) {}


    login$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.login),
        mergeMap((resp)=>
            this.authService.login(resp.email,resp.password).pipe(        
                // tap((x)=>{console.log(">>>efects"+x)}),      
                // delay(500),                  
                map((response)=>                                                
                    {   this.messageService.showNotification('Bienvenido.', 'Éxito','Ok', 'success', 5000);                        
                        return authAccions.loginSuccess({...response})}
                ),                
                catchError((err)=> of(authAccions.loginError({payload:err}))),
            ))
        ));

        sigInUp$ = createEffect(()=>this.actions$.pipe(
            ofType(authAccions.siginup),
            mergeMap((resp)=>
                this.authService.register(resp.user).pipe(                            
                    map((response)=>                                                
                        {   this.messageService.showNotification('Creado con éxito.', 'Éxito','Ok', 'success', 5000);                        
                            return authAccions.siginupSuccess({...response})}
                    ),                
                    catchError((err)=> of(authAccions.siginupError({payload:err}))),
                ))
            ));


    resetPassword$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.resetPassword),
        mergeMap((resp)=>{            
            return this.authService.resetPassword(resp.email, (environment.wetchUrl+'/change-password')).pipe(                            
                map((response)=>                                                
                    {   this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 20000);                        
                        return authAccions.resetPasswordSuccess({...response})}
                ),                
                catchError((err)=> of(authAccions.resetPasswordError({payload:err}))),
            )})
        ));

    cookieAuthenticate$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.cookieAuthentication),
        mergeMap(()=>{            
            return this.authService.loginBackend().pipe(                
                map((response)=>                                                
                    {                                              
                        //401 or 419 if(status is 401 or 409 mandar a cookieAuthentication)
                        return authAccions.cookieAuthenticationSuccess({cookie:response.status})
                    }
                ),                
                catchError((err)=> of(authAccions.cookieAuthenticationError({payload:err})))                 
            )}),            
        ));
}