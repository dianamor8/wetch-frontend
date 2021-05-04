import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Ambiente } from '../models/ambiente';
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
