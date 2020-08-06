import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

// accéder à l'état AuthState
export const authSelector = createFeatureSelector('auth');
// retourne la propriété error sur l'état AuthState
export const errorAuthSelector = createSelector(authSelector, (authState: AuthState) => authState.error);
// retourne la propriété error sur l'état AuthState
export const tokenSelector = createSelector(authSelector, (authState: AuthState) => authState.token);
// retourne la propriété isLoggedIn
export const isLoggedInSelector = createSelector(authSelector, (authState: AuthState) => authState.isLoggedIn);
// retourne la propriété user
export const currentUserSelector = createSelector(authSelector, (authState: AuthState) => authState.user);