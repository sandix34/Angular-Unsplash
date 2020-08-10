import { PhotosActions, PhotosActionTypes } from './photos.actions';

export interface PhotosState {
  photos: any[];
  filter: string;
};

export const initialPhotosState: PhotosState = {
  photos: null,
  filter: null
};

export function photosReducer(state: PhotosState = initialPhotosState, action: PhotosActions): PhotosState {
  switch (action.type) {
    case PhotosActionTypes.SetFilter: {
      return {
        ...state,
        filter: action.payload
      }
    }
  }
  return state;
}