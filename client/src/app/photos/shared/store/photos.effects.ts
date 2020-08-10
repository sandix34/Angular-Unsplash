import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../shared/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PhotosActionTypes, FetchPhotos } from './photos.actions';
import { switchMap, tap, take, debounceTime } from 'rxjs/operators';
import { filterSelector } from './photos.selectors';

@Injectable()
export class PhotosEffects {

@Effect({ dispatch: false })
  fetchPhotos$ = this.actions$.pipe(
    ofType<FetchPhotos>(PhotosActionTypes.FetchPhotos),
    // ne déclencher le switchMap que lorsque on reçoit de nouvelles valeurs pendant 1 seconde
    debounceTime(1000),
    switchMap(() => this.store.pipe(select(filterSelector), take(1))),
    tap((filter: string) => console.log('Search:', filter))
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
  ) { }
}