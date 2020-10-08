import { Photo } from '../models/photo.model';
import { PhotosActions, PhotosActionTypes } from 'src/app/photos/shared/store/photos.actions';

export interface PhotosState {
  photo: Photo;
}

export const initialPhotosState: PhotosState = {
  photo: null
}

export function photosReducer(state: PhotosState = initialPhotosState, action: PhotosActions): PhotosState {
  switch (action.type) {
    case PhotosActionTypes.TrySearchPhoto: {
      return {
        ...state,
        photo: action.payload
      }
    }
  }
  return state;
}
