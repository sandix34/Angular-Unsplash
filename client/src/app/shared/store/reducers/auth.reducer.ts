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
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  error: null
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions) {
  switch (action.type) {
    // possibilité de lier les 2 cas pour une même modification
    case AuthActionTypes.SigninError:
    case AuthActionTypes.SignupError: {
      return {
        ...state,
        error: action.payload
      };
    }
    case AuthActionTypes.SigninSuccess: {
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
        error: null
      };
    }
    case AuthActionTypes.Logout: {
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        error: null,
        user: null
      };
    }
    case AuthActionTypes.SetCurrentUser: {
      return {
        ...state,
        user: action.payload
      };
    }
  }
  return state;
}