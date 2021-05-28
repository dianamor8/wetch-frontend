import { HttpHeaders } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Profile } from "../models/profile";
import { User } from "../models/user";

export const login = createAction(
    '[AUTH] Login', props<{email:string; password:string, returnUrl:string}>()
);

export const loginSuccess = createAction(
    '[AUTH] Login Success', props<{user:User, access_token:string, token_type:string, returnUrl:string}>()
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

export const resetPassword = createAction(
    '[AUTH] Reset password', props<{email: string}>()
);

export const resetPasswordSuccess = createAction(
    '[AUTH] Reset password suscess', props<{message: string}>()
);

export const resetPasswordError = createAction(
    '[AUTH] Reset password error', props<{payload: any}>()
);


export const cookieAuthentication = createAction(
    '[AUTH] Cookie Authentication'
);

export const cookieAuthenticationSuccess = createAction(
    '[AUTH] Cookie Authentication success', props<{cookie: number}>()
);

export const cookieAuthenticationError = createAction(
    '[AUTH] Cookie Authentication error', props<{payload: any}>()
);

export const logout = createAction(
    '[AUTH] Logout'
);

export const logoutSuccess = createAction(
    '[AUTH] Logout Success'
);

export const logoutError = createAction(
    '[AUTH] Logout Error', props<{payload: any}>()
);

export const changePassword = createAction(
    '[AUTH] Change Password', props<{password: string}>()
);

export const changePasswordSuccess = createAction(
    '[AUTH] Change Password Success'
);

export const changePasswordError = createAction(
    '[AUTH] Change Password Error', props<{payload: any}>()
);

export const addToken = createAction(
    '[AUTH] Add token store', props<{token:string}>()
);

export const updateProfile = createAction(
    '[AUTH] Update Profile', props<{profile:Profile}>()
);

export const updateProfileSuccess = createAction(
    '[AUTH] Update Profile Success', props<{profile:Profile}>()
);

export const updateProfileError  = createAction(
    '[AUTH] Update Profile Error', props<{payload: any}>()
);