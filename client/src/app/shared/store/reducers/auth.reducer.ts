import { User } from '../../models/user.model';
import { AuthActions } from '../actions/auth.actions';

export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedin: boolean;
};

export function authReducer(state: AuthState, action: AuthActions) {
  return state;
}