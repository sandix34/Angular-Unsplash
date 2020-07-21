import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

// accéder à l'état AuthState
export const authSelector = createFeatureSelector('auth');
// retourne la propriété error sur l'état AuthState
export const errorAuthSelector = createSelector(authSelector, (authState: AuthState) => authState.error);