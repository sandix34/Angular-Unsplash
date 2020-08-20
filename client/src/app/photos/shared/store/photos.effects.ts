import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { TrySearchPhoto, PhotosActionTypes } from './photos.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotosEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  trySearchPhoto$ = this.actions$.pipe(
    ofType<TrySearchPhoto>(PhotosActionTypes.TrySearchPhoto),
    map((action: TrySearchPhoto) => action.payload)
  );
}