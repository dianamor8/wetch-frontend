import { createReducer, on } from "@ngrx/store";
import { login, loginError, loginSuccess } from "../actions";
import { User } from "../models/user";

export interface AuthState{
    userAuth: User | null;    
    access_token:string;
    token_type:string;
    loading:boolean;
    loaded: boolean;
    error:any;
}

export const initialState:AuthState = {
    userAuth: null,    
    access_token:"",
    token_type:"",
    loading:false,
    loaded: false, 
    error:null,
}

const __authReducer = createReducer(
    initialState,
    on(login, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(loginSuccess, (state, {user, access_token, token_type})=>({
        ...state,
        loading:false,
        loaded:true,
        userAuth:user,
        access_token:access_token,
        token_type:token_type,
        error:null
    })),
    on(loginError, (state, {payload})=>({
        ...state,
        loading:false,
        loaded:false,
        userAuth:null,
        access_token:"",
        token_type:"",
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message:payload.error.message
        }
    })),
);

export function authReducer(state, action){
    return __authReducer(state, action);
}
