import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as authAccions from '../actions';
import { loginError } from '../actions';
import { AuthService } from '../services/auth.service';
import { mergeMap, map, catchError, find, tap, filter, exhaustMap, switchMap, delay, take } from 'rxjs/operators';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { environment } from "./../../../environments/environment";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {
    
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService:MessageService,
        private router: Router
        ) {}


    login$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.login),
        mergeMap((resp)=>
            this.authService.login(resp.email,resp.password).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Bienvenido.', 'Éxito','Ok', 'success', 5000);                        
                        return authAccions.loginSuccess({...response, returnUrl:resp.returnUrl})}
                ),                
                catchError((err)=> of(authAccions.loginError({payload:err}))),
            ))
        ));

    sigInUp$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.siginup),
        mergeMap((resp)=>
            this.authService.register(resp.user, (environment.wetchUrl+'/validate-account')).pipe(                            
                map((response)=>                                                
                    {   this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 8000);                        
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

    logOut$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.logout),
        mergeMap((resp)=>{       
            return this.authService.logOut().pipe(                            
                map((response)=>                                                
                    {   this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 6000);                        
                        return authAccions.logoutSuccess()}
                ),                
                catchError((err)=> of(authAccions.logoutError({payload:err}))),
            )})
        ));



    changePassword$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.changePassword),
        mergeMap((resp)=>{       
            return this.authService.changePassword(resp.password).pipe(                            
                map((response)=>                                                
                    {   this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 6000);                        
                        return authAccions.changePasswordSuccess()}
                ),                
                catchError((err)=> {
                    this.messageService.showNotification(err, 'Error','Ok', 'error', 6000);
                    return of(authAccions.changePasswordError({payload:err}))
                }),
            )})
        ));

        updateProfile$ = createEffect(()=>this.actions$.pipe(
            ofType(authAccions.updateProfile),
            mergeMap((resp)=>
                this.authService.updateProfile(resp.profile).pipe(                                 
                    map((response)=>                                                
                        {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                            return authAccions.updateProfileSuccess({profile:response})}
                    ),                
                    catchError((err)=> 
                    {
                        this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                        return of(authAccions.updateProfileError({payload:err}))
                    }
                    ),
                ))
            ));
        
            getAllUsersSystem$ = createEffect(()=>this.actions$.pipe(
            ofType(authAccions.getAllUsersSystem),
            mergeMap((resp)=>
                this.authService.getAllUsersSystem().pipe(                                 
                    map((response)=>                                                
                        {                                                
                            return authAccions.getAllUsersSystemSuccess({usersSystem: response})}
                    ),                
                    catchError((err)=> of(authAccions.getAllUsersSystemError({payload:err}))),
                ))
            ));

            updateRoles$ = createEffect(()=>this.actions$.pipe(
                ofType(authAccions.updateUsersSystem),
                mergeMap((resp)=>
                    this.authService.updateRoles(resp.userSystem).pipe(                                 
                        map((response)=>                                                
                            {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                                return authAccions.updateUsersSystemSuccess({userSystem:response})}
                        ),                
                        catchError((err)=> 
                        {
                            this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                            return of(authAccions.updateUsersSystemError({payload:err}))
                        }
                        ),
                    ))
                ));

                updateStatus$ = createEffect(()=>this.actions$.pipe(
                    ofType(authAccions.statusUsersSystem),
                    mergeMap((resp)=>
                        this.authService.updateStatusUser(resp.userSystem).pipe(                                 
                            map((response)=>                                                
                                {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                                    return authAccions.statusUsersSystemSuccess({userSystem:response})}
                            ),                
                            catchError((err)=> 
                            {
                                this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                                return of(authAccions.statusUsersSystemError({payload:err}))
                            }
                            ),
                        ))
                    ));
        
    //EFECTS TO REDIRECT

    $LoginRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.loginSuccess),
        tap((x)=>{
            this.router.navigateByUrl(x.returnUrl);                
        })
    ), { dispatch: false });

    $SigInRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.siginupSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/');                
        })
    ), { dispatch: false });

    $LogOutRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.logoutSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/');
        })
    ), { dispatch: false });

    $ChangePasswordRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.changePasswordSuccess),
        tap((x)=>{
            
            this.router.navigateByUrl('/login');
        })
    ), { dispatch: false });  

}