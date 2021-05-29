import { createReducer, on } from "@ngrx/store";
import { login, loginError, loginSuccess, resetPassword, resetPasswordError, resetPasswordSuccess, siginup, siginupError, siginupSuccess, cookieAuthentication, cookieAuthenticationError, cookieAuthenticationSuccess, logout, logoutSuccess, logoutError, changePassword, changePasswordSuccess, changePasswordError, addToken, updateProfile, updateProfileSuccess, updateProfileError, getAllUsersSystem, getAllUsersSystemSuccess, getAllUsersSystemError, updateUsersSystem, updateUsersSystemSuccess, updateUsersSystemError, statusUsersSystem, statusUsersSystemSuccess, statusUsersSystemError } from "../actions";
import { User, UserSystem  } from "../models/user";



export interface AuthState{
    userAuth: User | null;
    usersSystem: UserSystem[] | null;    
    access_token:string;
    token_type:string;
    loading:boolean;
    loaded: boolean;
    error:any;
    cookieAuthenticate:any;
}

export const initialState:AuthState = {
    userAuth: null,    
    access_token:"",
    token_type:"",
    loading:false,
    loaded: false, 
    error:null,
    cookieAuthenticate:null,
    usersSystem:[]
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
    on(siginup, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(siginupSuccess, (state, {user, access_token, token_type})=>({
        ...state,
        loading:false,
        loaded:true,
        userAuth:user,
        access_token:access_token,
        token_type:token_type,
        error:null
    })),
    on(siginupError, (state, {payload})=>({
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
            message: displayMessageErrors(payload.error.errors)
        }
    })),
    on(resetPassword, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(resetPasswordSuccess, (state, {message})=>({
        ...state,
        loading:false,
        loaded:true,
        userAuth:null,
        access_token:"",
        token_type:"",
        error: null
    })),
    on(resetPasswordError, (state, {payload})=>({
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
            message: payload.error
        }
    })),

    on(cookieAuthentication, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false,
        cookieAuthenticate:null
    })),

    on(cookieAuthenticationSuccess, (state, {cookie}) => ({
        ...state, 
        error:null, 
        loading:false,
        loaded:true,
        cookieAuthenticate:cookie
    })),

    on(cookieAuthenticationError, (state, {payload}) => ({
        ...state,         
        loading:false,
        loaded:true,
        cookieAuthenticate:null,
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message: payload.error
        }
    })),

    on(logout, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false        
    })),

    on(logoutSuccess, (state) => ({
        ...state, 
        userAuth: null,    
        access_token:"",
        token_type:"",
        loading:false,
        loaded: true, 
        error:null,
        cookieAuthenticate:null        
    })),

    on(logoutError, (state, {payload}) => ({
        ...state,                 
        loading:false,
        loaded: true,                 
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message: payload.error
        }
    })),

    on(changePassword, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false        
    })),

    on(changePasswordSuccess, (state) => ({
        ...state, 
        userAuth: null,    
        access_token:"",
        token_type:"",
        loading:false,
        loaded: true, 
        error:null,
        cookieAuthenticate:null        
    })),

    on(changePasswordError, (state, {payload}) => ({
        ...state,                 
        loading:false,
        loaded: true,                 
        error:{
            url:payload.url,
            status:payload.status,
            statusText:payload.statusText,            
            message: payload.error.message
        }
    })),

    on(addToken, (state, {token}) => ({
        ...state,             
        access_token:token,        
    })),


    on(updateProfile, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateProfileSuccess, (state, {profile})=>({
        ...state,
        loading:false,
        loaded:true,
        userAuth: changeProfile(profile, state.userAuth)
    })),
    on(updateProfileError, (state, {payload})=>({
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

    on(getAllUsersSystem, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(getAllUsersSystemSuccess, (state, {usersSystem})=>({
        ...state,
        loading:false,
        loaded:true,
        usersSystem: [...usersSystem],
        error:null
    })),
    on(getAllUsersSystemError, (state, {payload})=>({
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

    on(updateUsersSystem, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(updateUsersSystemSuccess, (state, {userSystem})=>({
        ...state,
        loading:false,
        loaded:true,        
        usersSystem: state.usersSystem.map(ussys =>{
            if(ussys.id === userSystem.id){                
                return {...ussys, ...userSystem}
            }
            return ussys;
        }),
        error:null
    })),
    on(updateUsersSystemError, (state, {payload})=>({
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

    on(statusUsersSystem, (state) => ({
        ...state, 
        error:null, 
        loading:true,
        loaded:false
    })),
    on(statusUsersSystemSuccess, (state, {userSystem})=>({
        ...state,
        loading:false,
        loaded:true,        
        usersSystem: state.usersSystem.map(ussys =>{
            if(ussys.id === userSystem.id){                
                return {...ussys, ...userSystem}
            }
            return ussys;
        }),
        error:null
    })),
    on(statusUsersSystemError, (state, {payload})=>({
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

export function changeProfile(profile, user):User{
    let userTemp = {...user};
    userTemp.profile = profile;
    return userTemp;
}

export function authReducer(state, action){
    return __authReducer(state, action);
}
