import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as proyectosAccions from '../actions';
import { mergeMap, map, catchError, find, tap, filter, exhaustMap, switchMap, delay, take } from 'rxjs/operators';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { Router } from '@angular/router';
import { ProyectosService } from '../service/proyectos.service';


@Injectable({
    providedIn: 'root'
})
export class ProyectosEffects {
    
    constructor(
        private actions$: Actions,
        private proyectoService: ProyectosService,
        private messageService:MessageService,
        private router: Router
        ) {}


    getAllProyectos$ = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.getAllProyectos),
        mergeMap((resp)=>
            this.proyectoService.getAllProyecto().pipe(                                 
                map((response)=>                                                
                    {                                                
                        return proyectosAccions.getAllProyectosSuccess({proyectos: response})}
                ),                
                catchError((err)=> of(proyectosAccions.getAllProyectosError({payload:err}))),
            ))
        ));
    
    addProyecto$ = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.addProyecto),
        mergeMap((resp)=>
            this.proyectoService.addProyecto(resp.proyecto).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Agregado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return proyectosAccions.addProyectoSuccess({proyecto:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No se pudo agregar', 'Error','Ok', 'error', 4000);
                    return of(proyectosAccions.addProyectoError({payload:err}))
                }
                ),
            ))
        ));

    updateProyecto$ = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.updateProyecto),
        mergeMap((resp)=>
            this.proyectoService.updateProyecto(resp.proyecto).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return proyectosAccions.updateProyectoSuccess({proyecto:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                    return of(proyectosAccions.updateProyectoError({payload:err}))
                }
                ),
            ))
        ));
    

    deleteProyecto$ = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.deleteProyecto),
        mergeMap((resp)=>
            this.proyectoService.deleteProyecto(resp.proyecto).pipe(                                 
                map((response)=>                                                
                    {   
                        this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 4000);                                     
                        return proyectosAccions.deleteProyectoSuccess({proyecto:resp.proyecto})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification(err.error.message, 'Error','Ok', 'error', 4000);
                    return of(proyectosAccions.deleteProyectoError({payload:err}))
                }
                ),
            ))
        ));        

    $addProyectoRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.addProyectoSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/proyectos/proyectos-list');
        })
    ), { dispatch: false });

    $updateProyectoRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(proyectosAccions.updateProyectoSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/proyectos/proyectos-list');
        })
    ), { dispatch: false });
}