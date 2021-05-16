import { createReducer, on } from "@ngrx/store";
import { addProyecto, addProyectoError, addProyectoSuccess, deleteProyecto, deleteProyectoError, deleteProyectoSuccess, getAllProyectos, getAllProyectosError, getAllProyectosSuccess, updateProyecto, updateProyectoError, updateProyectoSuccess } from "../actions";
import { Proyecto } from "../models/proyecto";

export interface ProyectosState{
    proyectos: Proyecto[] | null;     
    loading:boolean;
    loaded: boolean;
    error:any;    
}

export const initialState:ProyectosState = {
    proyectos:[],        
    loading:false,
    loaded: false, 
    error:null,
}

const __proyectosReducer = createReducer(
    initialState,
    on(addProyecto, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(addProyectoSuccess, (state, {proyecto})=>({
        ...state,
        loading:false,
        loaded:true,
        proyectos: [...state.proyectos, proyecto],
        error:null
    })),
    on(addProyectoError, (state, {payload})=>({
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
    on(getAllProyectos, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(getAllProyectosSuccess, (state, {proyectos})=>({
        ...state,
        loading:false,
        loaded:true,
        proyectos: [...proyectos],
        error:null
    })),
    on(getAllProyectosError, (state, {payload})=>({
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
    on(updateProyecto, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateProyectoSuccess, (state, {proyecto})=>({
        ...state,
        loading:false,
        loaded:true,
        proyectos: state.proyectos.map(proyecto_m =>{
            if(proyecto_m.id === proyecto.id){                
                return {...proyecto_m, ...proyecto}
            }
            return proyecto_m;
        }),
        error:null
    })),
    on(updateProyectoError, (state, {payload})=>({
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
    on(deleteProyecto, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(deleteProyectoSuccess, (state, {proyecto})=>({
        ...state,
        loading:false,
        loaded:true,
        proyectos: [...state.proyectos.filter(element=>element.id!==proyecto.id)],
        error:null
    })),
    on(deleteProyectoError, (state, {payload})=>({
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


export function proyectosReducer(state, action){
    return __proyectosReducer(state, action);
}
