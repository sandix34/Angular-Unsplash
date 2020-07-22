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
  SigninError 
} from "../actions/auth.actions";
import { map, exhaustMap, catchError, tap, switchMap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { of, Subscription } from "rxjs";

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
    switchMap(() => this.authService.refreshToken().pipe(
      map(token => {
        return new SigninSuccess(token);
      }),
      catchError(() => {
        localStorage.removeItem('token');
        return of(null);
      })
    ))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
