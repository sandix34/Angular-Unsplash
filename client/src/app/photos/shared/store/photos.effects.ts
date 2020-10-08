import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { TrySearchPhoto, PhotosActionTypes } from './photos.actions';
import { map, switchMap } from 'rxjs/operators';
import { PhotosService } from '../services/photos.service';

@Injectable()
export class PhotosEffects {

  constructor(private actions$: Actions, private photoService: PhotosService) {}

  @Effect()
  trySearchPhoto$ = this.actions$.pipe(
    ofType<TrySearchPhoto>(PhotosActionTypes.TrySearchPhoto),
    map((action: TrySearchPhoto) => action.payload),
    switchMap((payload) => {
      console.log(payload) 
      return this.photoService.searchPhotos(payload)
      } 
    )
  );

}