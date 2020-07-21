import { User } from '../../models/user.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedIn: boolean;
};

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.SignupError: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}