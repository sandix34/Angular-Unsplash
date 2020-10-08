import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotosState } from './photos.reducer';

export const photosSelector = createFeatureSelector('photos');
//export const filterSelector = createSelector(photosSelector, (photosState: PhotosState) => photosState.photo);
export const photosResultsSelector = createSelector(photosSelector, (photosState: PhotosState) => photosState.photo);