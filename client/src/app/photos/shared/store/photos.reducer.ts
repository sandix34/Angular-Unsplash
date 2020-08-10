import { PhotosActions } from './photos.actions';

export interface PhotosState {
  photos: any[];
  filter: string;
};

export const initialPhotosState: PhotosState = {
  photos: null,
  filter: null
};

export function photosReducer(state: PhotosState = initialPhotosState, action: PhotosActions): PhotosState {
  return state;
}