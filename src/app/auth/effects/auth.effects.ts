import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as authAccions from '../actions';
import { loginError } from '../actions';
import { AuthService } from '../services/auth.service';
import { mergeMap, map, catchError, find, tap, filter, exhaustMap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {
    
    constructor(
        private actions$: Actions,
        private authService: AuthService
        ) {}


    login$ = createEffect(()=>this.actions$.pipe(
        ofType(authAccions.login),
        mergeMap((resp)=>
            this.authService.login(resp.email,resp.password).pipe(        
                tap((x)=>{console.log(x)}),                        
                map((response)=>authAccions.loginSuccess({...response})),                
                catchError((err)=> of(authAccions.loginError({payload:err}))),
            ))
        ));
}