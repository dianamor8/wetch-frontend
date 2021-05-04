import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { AuthState, authReducer } from "./auth/reducers";
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from "src/environments/environment";
import { prefactibilidadReducer, PrefactibilidadState } from "./prefactibilidad/reducers";

export interface AppState{
    authApp: AuthState;
    prefactibilidadApp: PrefactibilidadState;
}

export const appReducers: ActionReducerMap<AppState> = {    
    authApp: authReducer,
    prefactibilidadApp: prefactibilidadReducer
}


const reducerKeys = ['authApp', 'prefactibilidadApp'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys, rehydrate:true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

