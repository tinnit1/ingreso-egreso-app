import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer.js';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import {ingresoEgresoReducer} from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  // ingresosEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.loadingReducer,
  user: auth.authReducer,
  // ingresosEgresos: ingresoEgresoReducer
};
