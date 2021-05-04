import { HttpHeaders } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { TipoAcabado } from "../models/acabado";
import { Ambiente } from "../models/ambiente";
import { TipoAreaVivienda } from "../models/tipo-area-vivienda";

export const addTipoAreaVivienda = createAction(
    '[PREFACT] Add TipoAreaVivienda', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const addTipoAreaViviendaSuccess = createAction(
    '[PREFACT] Add TipoAreaVivienda Success', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const addTipoAreaViviendaError  = createAction(
    '[PREFACT] Add TipoAreaVivienda Error', props<{payload: any}>()
);

export const getAllTipoAreaVivienda = createAction(
    '[PREFACT] Get all TipoAreaVivienda'
);

export const getAllTipoAreaViviendaSuccess = createAction(
    '[PREFACT] Get all TipoAreaVivienda Success', props<{tipoAreaViviendas:TipoAreaVivienda[]}>()
);

export const getAllTipoAreaViviendaError  = createAction(
    '[PREFACT] Get all TipoAreaVivienda Error', props<{payload: any}>()
);

export const updateTipoAreaVivienda = createAction(
    '[PREFACT] Update TipoAreaVivienda', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const updateTipoAreaViviendaSuccess = createAction(
    '[PREFACT] Update TipoAreaVivienda Success', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const updateTipoAreaViviendaError  = createAction(
    '[PREFACT] Update TipoAreaVivienda Error', props<{payload: any}>()
);

export const deleteTipoAreaVivienda = createAction(
    '[PREFACT] Delete TipoAreaVivienda', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const deleteTipoAreaViviendaSuccess = createAction(
    '[PREFACT] Delete TipoAreaVivienda Success', props<{tipoAreaVivienda:TipoAreaVivienda}>()
);

export const deleteTipoAreaViviendaError  = createAction(
    '[PREFACT] Delete TipoAreaVivienda Error', props<{payload: any}>()
);

export const addAmbiente = createAction(
    '[PREFACT] Add Ambiente', props<{ambiente:Ambiente}>()
);

export const addAmbienteSuccess = createAction(
    '[PREFACT] Add Ambiente Success', props<{ambiente:Ambiente}>()
);

export const addAmbienteError  = createAction(
    '[PREFACT] Add Ambiente Error', props<{payload: any}>()
);

export const getAllAmbiente = createAction(
    '[PREFACT] Get all Ambiente'
);

export const getAllAmbienteSuccess = createAction(
    '[PREFACT] Get all Ambiente Success', props<{ambientes:Ambiente[]}>()
);

export const getAllAmbienteError  = createAction(
    '[PREFACT] Get all Ambiente Error', props<{payload: any}>()
);

export const updateAmbiente = createAction(
    '[PREFACT] Update Ambiente', props<{ambiente:Ambiente}>()
);

export const updateAmbienteSuccess = createAction(
    '[PREFACT] Update Ambiente Success', props<{ambiente:Ambiente}>()
);

export const updateAmbienteError  = createAction(
    '[PREFACT] Update Ambiente Error', props<{payload: any}>()
);

export const deleteAmbiente = createAction(
    '[PREFACT] Delete Ambiente', props<{ambiente:Ambiente}>()
);

export const deleteAmbienteSuccess = createAction(
    '[PREFACT] Delete Ambiente Success', props<{ambiente:Ambiente}>()
);

export const deleteAmbienteError  = createAction(
    '[PREFACT] Delete Ambiente Error', props<{payload: any}>()
);

export const getAllAcabado = createAction(
    '[PREFACT] Get all Acabado'
);

export const getAllAcabadoSuccess = createAction(
    '[PREFACT] Get all Acabado Success', props<{acabados:TipoAcabado[]}>()
);

export const getAllAcabadoError  = createAction(
    '[PREFACT] Get all Acabado Error', props<{payload: any}>()
);

export const addAcabado = createAction(
    '[PREFACT] Add Acabado', props<{acabado:TipoAcabado}>()
);

export const addAcabadoSuccess = createAction(
    '[PREFACT] Add Acabado Success', props<{acabado:TipoAcabado}>()
);

export const addAcabadoError  = createAction(
    '[PREFACT] Add Acabado Error', props<{payload: any}>()
);

export const updateAcabado = createAction(
    '[PREFACT] Update Acabado', props<{acabado:TipoAcabado}>()
);

export const updateAcabadoSuccess = createAction(
    '[PREFACT] Update Acabado Success', props<{acabado:TipoAcabado}>()
);

export const updateAcabadoError  = createAction(
    '[PREFACT] Update Acabado Error', props<{payload: any}>()
);

export const deleteAcabado = createAction(
    '[PREFACT] Delete Acabado', props<{acabado:TipoAcabado}>()
);

export const deleteAcabadoSuccess = createAction(
    '[PREFACT] Delete Acabado Success', props<{acabado:TipoAcabado}>()
);

export const deleteAcabadoError  = createAction(
    '[PREFACT] Delete Acabado Error', props<{payload: any}>()
);
