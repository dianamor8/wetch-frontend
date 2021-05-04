import { HttpHeaders } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Proyecto } from "../models/proyecto";


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
