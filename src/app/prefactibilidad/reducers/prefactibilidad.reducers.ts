import { createReducer, on } from "@ngrx/store";
import { addAmbiente, addAmbienteError, addAmbienteSuccess, addTipoAreaVivienda, addTipoAreaViviendaError, addTipoAreaViviendaSuccess, deleteAmbiente, deleteAmbienteSuccess, deleteTipoAreaVivienda, deleteTipoAreaViviendaError, deleteTipoAreaViviendaSuccess, getAllAmbiente, getAllAmbienteError, getAllAmbienteSuccess, getAllTipoAreaVivienda, getAllTipoAreaViviendaError, getAllTipoAreaViviendaSuccess, updateAmbiente, updateAmbienteError, updateAmbienteSuccess, updateTipoAreaVivienda, updateTipoAreaViviendaError, updateTipoAreaViviendaSuccess, deleteAmbienteError, getAllAcabado, getAllAcabadoSuccess, getAllAcabadoError, addAcabado, addAcabadoSuccess, addAcabadoError, updateAcabado, updateAcabadoSuccess, updateAcabadoError, deleteAcabado, deleteAcabadoSuccess, deleteAcabadoError } from "../actions";
import { TipoAcabado } from "../models/acabado";
import { Ambiente } from "../models/ambiente";
import { TipoAreaVivienda } from "../models/tipo-area-vivienda";


export interface PrefactibilidadState{
    tipoAreaViviendas: TipoAreaVivienda[] | null; 
    acabados: TipoAcabado[] | null; 
    ambientes?:Ambiente [] | null;       
    loading:boolean;
    loaded: boolean;
    error:any;    
}

export const initialState:PrefactibilidadState = {
    tipoAreaViviendas:[],    
    acabados:[],    
    ambientes:[],
    loading:false,
    loaded: false, 
    error:null,
}

const __prefactibilidadReducer = createReducer(
    initialState,
    on(getAllTipoAreaVivienda, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(getAllTipoAreaViviendaSuccess, (state, {tipoAreaViviendas})=>({
        ...state,
        loading:false,
        loaded:true,
        tipoAreaViviendas: [...tipoAreaViviendas],
        error:null
    })),

    on(getAllTipoAreaViviendaError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),   
    on(addTipoAreaVivienda, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(addTipoAreaViviendaSuccess, (state, {tipoAreaVivienda})=>({
        ...state,
        loading:false,
        loaded:true,
        tipoAreaViviendas: [...state.tipoAreaViviendas, tipoAreaVivienda],
        error:null
    })),

    on(addTipoAreaViviendaError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(updateTipoAreaVivienda, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateTipoAreaViviendaSuccess, (state, {tipoAreaVivienda})=>({
        ...state,
        loading:false,
        loaded:true,
        tipoAreaViviendas: state.tipoAreaViviendas.map(tav =>{
            if(tav.id === tipoAreaVivienda.id){                
                return {...tav, ...tipoAreaVivienda}
            }
            return tav;
        }),
        error:null
    })),
    on(updateTipoAreaViviendaError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(deleteTipoAreaVivienda, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(deleteTipoAreaViviendaSuccess, (state, {tipoAreaVivienda})=>({
        ...state,
        loading:false,
        loaded:true,
        tipoAreaViviendas: [...state.tipoAreaViviendas.filter(element=>element.id!==tipoAreaVivienda.id)],
        error:null
    })),
    on(deleteTipoAreaViviendaError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(addAmbiente, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(addAmbienteSuccess, (state, {ambiente})=>({
        ...state,
        loading:false,
        loaded:true,
        ambientes: [...state.ambientes, ambiente],
        error:null
    })),

    on(addAmbienteError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(getAllAmbiente, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(getAllAmbienteSuccess, (state, {ambientes})=>({
        ...state,
        loading:false,
        loaded:true,
        ambientes: [...ambientes],
        error:null
    })),

    on(getAllAmbienteError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })), 

    on(updateAmbiente, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateAmbienteSuccess, (state, {ambiente})=>({
        ...state,
        loading:false,
        loaded:true,
        ambientes: state.ambientes.map(ambiente_m =>{
            if(ambiente_m.id === ambiente.id){                
                return {...ambiente_m, ...ambiente}
            }
            return ambiente_m;
        }),
        error:null
    })),
    on(updateAmbienteError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(deleteAmbiente, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(deleteAmbienteSuccess, (state, {ambiente})=>({
        ...state,
        loading:false,
        loaded:true,
        ambientes: [...state.ambientes.filter(element=>element.id!==ambiente.id)],
        error:null
    })),
    on(deleteAmbienteError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    // ACABADO
    on(getAllAcabado, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(getAllAcabadoSuccess, (state, {acabados})=>({
        ...state,
        loading:false,
        loaded:true,
        acabados: [...acabados],
        error:null
    })),

    on(getAllAcabadoError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),   
    on(addAcabado, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(addAcabadoSuccess, (state, {acabado})=>({
        ...state,
        loading:false,
        loaded:true,
        acabados: [...state.acabados, acabado],
        error:null
    })),

    on(addAcabadoError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(updateAcabado, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateAcabadoSuccess, (state, {acabado})=>({
        ...state,
        loading:false,
        loaded:true,
        acabados: state.acabados.map(aca =>{
            if(aca.id === acabado.id){                
                return {...aca, ...acabado}
            }
            return aca;
        }),
        error:null
    })),
    on(updateAcabadoError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),

    on(deleteAcabado, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(deleteAcabadoSuccess, (state, {acabado})=>({
        ...state,
        loading:false,
        loaded:true,
        acabados: [...state.acabados.filter(element=>element.id!==acabado.id)],
        error:null
    })),
    on(deleteAcabadoError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,        
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),
    
);

export function displayMessageErrors(errors:any):string{
    let message="";
    let error:any;
    
    for (error in errors) {        
        message = message +
                  errors[error] + 
                  "\n"
    }    
    return message;
}

export function prefactibilidadReducer(state, action){
    return __prefactibilidadReducer(state, action);
}
