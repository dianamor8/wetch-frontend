import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

export const login = createAction(
    '[AUTH] Login', props<{email:string; password:string}>()
);

export const loginSuccess = createAction(
    '[AUTH] Login Success', props<{user:User, access_token:string, token_type:string}>()
);

export const loginError = createAction(
    '[AUTH] Login Error', props<{payload: any}>()
);

export const siginup = createAction(
    '[AUTH] Sigin up', props<{ user: User}>()
  );

export const siginupSuccess = createAction(
    '[AUTH] Sigin up success', props<{ user: User, access_token:string, token_type:string}>()
);


export const siginupError = createAction(
    '[AUTH] Sigin up error', props<{payload: any}>()
);

export const logout = createAction(
    '[AUTH] Logout'
);