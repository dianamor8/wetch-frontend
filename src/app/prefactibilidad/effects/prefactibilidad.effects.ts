import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as prefactibilidadAccions from '../actions';
import { mergeMap, map, catchError, find, tap, filter, exhaustMap, switchMap, delay, take } from 'rxjs/operators';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { Router } from '@angular/router';
import { PrefactibilidadService } from '../service/prefactibilidad.service';

@Injectable({
    providedIn: 'root'
})
export class PrefactibilidadEffects {
    
    constructor(
        private actions$: Actions,
        private prefactibilidadService: PrefactibilidadService,
        private messageService:MessageService,
        private router: Router
        ) {}


    getAllTipoAreaVivienda$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.getAllTipoAreaVivienda),
        mergeMap((resp)=>
            this.prefactibilidadService.getAllTipoAreaVivienda().pipe(                                 
                map((response)=>                                                
                    {                                                
                        return prefactibilidadAccions.getAllTipoAreaViviendaSuccess({tipoAreaViviendas: response})}
                ),                
                catchError((err)=> of(prefactibilidadAccions.getAllTipoAreaViviendaError({payload:err}))),
            ))
        ));
    
    addTipoAreaVivienda$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.addTipoAreaVivienda),
        mergeMap((resp)=>
            this.prefactibilidadService.addTipoAreaVivienda(resp.tipoAreaVivienda).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Agregado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.addTipoAreaViviendaSuccess({tipoAreaVivienda:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No se pudo agregar', 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.addTipoAreaViviendaError({payload:err}))
                }
                ),
            ))
        ));

    updateTipoAreaVivienda$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.updateTipoAreaVivienda),
        mergeMap((resp)=>
            this.prefactibilidadService.updateTipoAreaVivienda(resp.tipoAreaVivienda).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.updateTipoAreaViviendaSuccess({tipoAreaVivienda:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.updateTipoAreaViviendaError({payload:err}))
                }
                ),
            ))
        ));
    

    deleteTipoAreaVivienda$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.deleteTipoAreaVivienda),
        mergeMap((resp)=>
            this.prefactibilidadService.deleteTipoAreaVivienda(resp.tipoAreaVivienda).pipe(                                 
                map((response)=>                                                
                    {   console.log(response);
                        this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.deleteTipoAreaViviendaSuccess({tipoAreaVivienda:resp.tipoAreaVivienda})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification(err.error.message, 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.deleteTipoAreaViviendaError({payload:err}))
                }
                ),
            ))
        ));
        
    addAmbiente$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.addAmbiente),
        mergeMap((resp)=>
            this.prefactibilidadService.addAmbiente(resp.ambiente).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Agregado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.addAmbienteSuccess({ambiente:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No se pudo agregar', 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.addAmbienteError({payload:err}))
                }
                ),
            ))
        ));

    getAllAmbiente$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.getAllAmbiente),
        mergeMap((resp)=>
            this.prefactibilidadService.getAllAmbiente().pipe(                                 
                map((response)=>                                                
                    {                                                
                        return prefactibilidadAccions.getAllAmbienteSuccess({ ambientes: response })}
                ),                
                catchError((err)=> of(prefactibilidadAccions.getAllAmbienteError({payload:err}))),
            ))
        ));

    updateAmbiente$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.updateAmbiente),
        mergeMap((resp)=>
            this.prefactibilidadService.updateAmbiente(resp.ambiente).pipe(                                 
                map((response)=>                                                
                    {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.updateAmbienteSuccess({ambiente:response})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.updateAmbienteError({payload:err}))
                }
                ),
            ))
        ));

    deleteambiente$ = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.deleteAmbiente),
        mergeMap((resp)=>
            this.prefactibilidadService.deleteAmbiente(resp.ambiente).pipe(                                 
                map((response)=>                                                
                    {   
                        this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 4000);                                     
                        return prefactibilidadAccions.deleteAmbienteSuccess({ambiente:resp.ambiente})}
                ),                
                catchError((err)=> 
                {
                    this.messageService.showNotification(err.error.message, 'Error','Ok', 'error', 4000);
                    return of(prefactibilidadAccions.deleteAmbienteError({payload:err}))
                }
                ),
            ))
        ));

        // ACABADO
        getAllAcabado$ = createEffect(()=>this.actions$.pipe(
            ofType(prefactibilidadAccions.getAllAcabado),
            mergeMap((resp)=>
                this.prefactibilidadService.getAllAcabado().pipe(                                 
                    map((response)=>                                                
                        {                                                
                            return prefactibilidadAccions.getAllAcabadoSuccess({acabados: response})}
                    ),                
                    catchError((err)=> of(prefactibilidadAccions.getAllAcabadoError({payload:err}))),
                ))
            ));
        
        addAcabado$ = createEffect(()=>this.actions$.pipe(
            ofType(prefactibilidadAccions.addAcabado),
            mergeMap((resp)=>
                this.prefactibilidadService.addAcabado(resp.acabado).pipe(                                 
                    map((response)=>                                                
                        {   this.messageService.showNotification('Agregado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                            return prefactibilidadAccions.addAcabadoSuccess({acabado:response})}
                    ),                
                    catchError((err)=> 
                    {
                        this.messageService.showNotification('No se pudo agregar', 'Error','Ok', 'error', 4000);
                        return of(prefactibilidadAccions.addAcabadoError({payload:err}))
                    }
                    ),
                ))
            ));
    
        updateAcabado$ = createEffect(()=>this.actions$.pipe(
            ofType(prefactibilidadAccions.updateAcabado),
            mergeMap((resp)=>
                this.prefactibilidadService.updateAcabado(resp.acabado).pipe(                                 
                    map((response)=>                                                
                        {   this.messageService.showNotification('Actualizado con éxito', 'Éxito','Ok', 'success', 4000);                                     
                            return prefactibilidadAccions.updateAcabadoSuccess({acabado:response})}
                    ),                
                    catchError((err)=> 
                    {
                        this.messageService.showNotification('No fue posible actualizar', 'Error','Ok', 'error', 4000);
                        return of(prefactibilidadAccions.updateAcabadoError({payload:err}))
                    }
                    ),
                ))
            ));
        
    
        deleteAcabado$ = createEffect(()=>this.actions$.pipe(
            ofType(prefactibilidadAccions.deleteAcabado),
            mergeMap((resp)=>
                this.prefactibilidadService.deleteAcabado(resp.acabado).pipe(                                 
                    map((response)=>                                                
                        {   
                            this.messageService.showNotification(response.message, 'Éxito','Ok', 'success', 4000);                                     
                            return prefactibilidadAccions.deleteAcabadoSuccess({acabado:resp.acabado})}
                    ),                
                    catchError((err)=> 
                    {
                        this.messageService.showNotification(err.error.message, 'Error','Ok', 'error', 4000);
                        return of(prefactibilidadAccions.deleteAcabadoError({payload:err}))
                    }
                    ),
                ))
            ));

    $addAmbienteRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.addAmbienteSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/prefactibilidad/ambiente-list');
        })
    ), { dispatch: false });

    $updateAmbienteRedirectTo = createEffect(()=>this.actions$.pipe(
        ofType(prefactibilidadAccions.updateAmbienteSuccess),
        tap((x)=>{
            this.router.navigateByUrl('/prefactibilidad/ambiente-list');
        })
    ), { dispatch: false });
}