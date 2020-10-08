import { Action } from '@ngrx/store';
import { Photo } from '../models/photo.model';


export enum PhotosActionTypes {
  TrySearchPhoto = "[ Photo ] - Try search photo"
}

export class TrySearchPhoto implements Action {
  readonly type = PhotosActionTypes.TrySearchPhoto;
  constructor(public payload: Photo) {}
}

export type PhotosActions = 
  | TrySearchPhoto
