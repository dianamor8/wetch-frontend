import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Profile } from '../models/profile';
import { User } from '../models/user';

export const user = (state: AppState) => state.authApp.userAuth;

export const getProfile = createSelector(
    user, 
    (user:User) => user!=null? user.profile : null 
);
