import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { 
  AuthActionTypes, 
  TrySignup, 
  SignupSuccess, 
  SignupError, 
  TrySignin, 
  SigninSuccess, 
  SigninError, 
  SetCurrentUser
} from "../actions/auth.actions";
import { map, exhaustMap, catchError, tap, switchMap, withLatestFrom } from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { of, Subscription, empty, EMPTY } from "rxjs";
import { select, Store } from '@ngrx/store';
import { tokenSelector } from '../selectors/auth.selectors';
import { State } from '..';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffects {
  subscription: Subscription;

  @Effect()
  trySignup$ = this.actions$.pipe(
    ofType<TrySignup>(AuthActionTypes.TrySignup),
    map((action: TrySignup) => action.payload),
    // empêcherd'autres tentative de signup tant que le signup est en cours
    exhaustMap((user: User) =>
      this.authService.signup(user).pipe(
        map((user) => new SignupSuccess(user)),
        catchError((error) => of(new SignupError(error)))
      )
    )
  );

  // rediriger l'utilisateur sur la page de connexion sans émettre de nouvelle action
  // dans le cas où l'inscription fonctionnerait
  @Effect({ dispatch: false })
  signupSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignupSuccess),
    tap(() => this.router.navigate(["/signin"]))
  );

  @Effect()
  trySignin$ = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TrySignin),
    map( (action: TrySignin) => action.payload),
    exhaustMap((credentials: {email: string, password: string}) =>
        this.authService.signin(credentials).pipe(
          map(token => new SigninSuccess(token)),
          catchError(error => of(new SigninError(error)))
        )
    )
  );

  // sauvegarde le token dans le cas où la connexion a fonctionné et déclenche le rafraîchissement du token
  @Effect({ dispatch: false })
  signinSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SigninSuccess),
    map( (action: SigninSuccess) => action.payload),
    tap((token) => {
      localStorage.setItem('token', token);
      if (!this.subscription) {
        this.subscription = this.authService.initRefreshToken().subscribe();
        this.router.navigate(['/']);
      }
    })
  );

  // déclenche la requête Http lorsqu'il reçoit une action de type TryRefreshToken
  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.TryRefreshToken),
    // vérifier qu'il y a un token dans l'application
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap(( [action, token] ) => {
      // si token on le rafraîchit
      if (token) {
          return this.authService.refreshToken()
            .pipe(
                map(newToken => new SigninSuccess(newToken)),
                catchError(() => {
                  localStorage.removeItem('token');
                  return EMPTY;
                })
              );
      } else {
        // retourne un observable avec une action avec un type non utilisé
        return EMPTY;
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  );

  // récupérer l'utilisateur  
  @Effect()
  tryFetchCurrentUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.TryFetchCurrentUser),
    switchMap(() => this.userService.getCurrentUser()),
    map((user: User) => new SetCurrentUser(user)),
    catchError((error: any) => {
      console.log(error);
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}
}
