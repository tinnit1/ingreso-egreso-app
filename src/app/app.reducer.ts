import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer.js';

export interface AppState {
  ui: ui.State;
  user: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.loadingReducer,
  user: auth.authReducer
};
