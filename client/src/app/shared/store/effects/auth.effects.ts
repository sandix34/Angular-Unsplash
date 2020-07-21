import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthActionTypes, TrySignup, SignupSuccess, SignupError } from "../actions/auth.actions";
import { map, exhaustMap, catchError, tap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
