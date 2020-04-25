import {createReducer, on} from '@ngrx/store';
import {isLoading, stopLoading} from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
}

const _loadingReducer = createReducer(initialState,
  on(isLoading, state => ({...state, isLoading: true})),
  on(stopLoading, state => ({...state, isLoading: false})),
);

export function loadingReducer(state, action) {
  return _loadingReducer(state, action);
}
