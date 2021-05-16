import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Proyecto } from '../models/proyecto';

export const proyectos = (state: AppState) => state.proyectosApp.proyectos;

export const getProyectoById = (idProyecto)=> createSelector(
    proyectos, 
    (proyts:Proyecto[]) => {
        if (proyts) {
            return proyts.find((a:Proyecto) => {
              return a.id === idProyecto;
            });
          } else {
            return null;
          }        
    });
