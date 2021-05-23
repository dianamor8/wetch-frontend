import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { TipoAcabado } from '../models/acabado';
import { Ambiente } from '../models/ambiente';
import { TipoAreaVivienda } from '../models/tipo-area-vivienda';
import { PrefactibilidadState } from '../reducers';

export const ambientes = (state: AppState) => state.prefactibilidadApp.ambientes;

export const getAmbienteById = (idAmbiente)=> createSelector(
    ambientes, 
    (ambs:Ambiente[]) => {
        if (ambs) {
            return ambs.find((a:Ambiente) => {
              return a.id === idAmbiente;
            });
          } else {
            return null;
          }        
    });

export const tiposAreaVivienda = (state: AppState) => state.prefactibilidadApp.tipoAreaViviendas;

export const getTipoAreaViviendaById = (idTipoAreaVivienda)=> createSelector(
    tiposAreaVivienda, 
    (tipos:TipoAreaVivienda[]) => {
        if (tipos) {
            return tipos.find((a:TipoAreaVivienda) => {
              return a.id === idTipoAreaVivienda;
            });
          } else {
            return null;
          }        
    });

export const tiposAcabados = (state: AppState) => state.prefactibilidadApp.acabados;

export const getTipoAcabadoById = (idTipoAcabado)=> createSelector(
    tiposAcabados, 
    (tipos:TipoAcabado[]) => {
        if (tipos) {
            return tipos.find((a:TipoAcabado) => {
              return a.id === idTipoAcabado;
            });
          } else {
            return null;
          }        
    });
    