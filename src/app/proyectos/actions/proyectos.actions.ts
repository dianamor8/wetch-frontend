import { HttpHeaders } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Prefactibilidad, Proyecto } from "../models/proyecto";


export const getAllProyectos = createAction(
    '[PROYECTO] Get all Proyecto'
);

export const getAllProyectosSuccess = createAction(
    '[PROYECTO] Get all Proyecto Success', props<{proyectos:Proyecto[]}>()
);

export const getAllProyectosError  = createAction(
    '[PROYECTO] Get all Proyecto Error', props<{payload: any}>()
);

export const addProyecto = createAction(
    '[PROYECTO] Add Proyecto', props<{proyecto:Proyecto}>()
);

export const addProyectoSuccess = createAction(
    '[PROYECTO] Add Proyecto Success', props<{proyecto:Proyecto}>()
);

export const addProyectoError  = createAction(
    '[PROYECTO] Add Proyecto Error', props<{payload: any}>()
);

export const updateProyecto = createAction(
    '[PROYECTO] Update Proyecto', props<{proyecto:Proyecto}>()
);

export const updateProyectoSuccess = createAction(
    '[PROYECTO] Update Proyecto Success', props<{proyecto:Proyecto}>()
);

export const updateProyectoError  = createAction(
    '[PROYECTO] Update Proyecto Error', props<{payload: any}>()
);

export const deleteProyecto = createAction(
    '[PROYECTO] Delete Proyecto', props<{proyecto:Proyecto}>()
);

export const deleteProyectoSuccess = createAction(
    '[PROYECTO] Delete Proyecto Success', props<{proyecto:Proyecto}>()
);

export const deleteProyectoError  = createAction(
    '[PROYECTO] Delete Proyecto Error', props<{payload: any}>()
);


export const getAllPrefactibilidad = createAction(
    '[PROYECTO] Get all Prefactibilidad'
);

export const getAllPrefactibilidadSuccess = createAction(
    '[PROYECTO] Get all Prefactibilidad Success', props<{prefactibilidads:Prefactibilidad[]}>()
);

export const getAllPrefactibilidadError  = createAction(
    '[PROYECTO] Get all Prefactibilidad Error', props<{payload: any}>()
);

export const addPrefactibilidad = createAction(
    '[PROYECTO] Add Prefactibilidad', props<{prefactibilidad:Prefactibilidad}>()
);

export const addPrefactibilidadSuccess = createAction(
    '[PROYECTO] Add Prefactibilidad Success', props<{prefactibilidad:Prefactibilidad}>()
);

export const addPrefactibilidadError  = createAction(
    '[PROYECTO] Add Prefactibilidad Error', props<{payload: any}>()
);

export const updatePrefactibilidad = createAction(
    '[PROYECTO] Update Prefactibilidad', props<{prefactibilidad:Prefactibilidad}>()
);

export const updatePrefactibilidadSuccess = createAction(
    '[PROYECTO] Update Prefactibilidad Success', props<{prefactibilidad:Prefactibilidad}>()
);

export const updatePrefactibilidadError  = createAction(
    '[PROYECTO] Update Prefactibilidad Error', props<{payload: any}>()
);

export const deletePrefactibilidad = createAction(
    '[PROYECTO] Delete Prefactibilidad', props<{prefactibilidad:Prefactibilidad}>()
);

export const deletePrefactibilidadSuccess = createAction(
    '[PROYECTO] Delete Prefactibilidad Success', props<{prefactibilidad:Prefactibilidad}>()
);

export const deletePrefactibilidadError  = createAction(
    '[PROYECTO] Delete Prefactibilidad Error', props<{payload: any}>()
);
