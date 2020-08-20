import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient, ) { }

  public searchPhotos(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>('api/photos', photo);
  }
}
