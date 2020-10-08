import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient, ) { }

  public searchPhotos(photo: Photo): Observable<any> {

    const httpOptions: { headers; observe; responseType } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response',
      responseType: 'json'
    };

    return this.http.post<Photo>('api/photos', photo, httpOptions).pipe(
      tap( resp => {
        console.log(resp.body.results);
        return resp.body.results
        }
      )
    )
  }
  
}
