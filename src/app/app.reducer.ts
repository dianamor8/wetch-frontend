import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { AuthState, authReducer } from "./auth/reducers";
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from "src/environments/environment";

export interface AppState{
    authApp: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {    
    authApp: authReducer
}


const reducerKeys = ['authApp'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys, rehydrate:true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

