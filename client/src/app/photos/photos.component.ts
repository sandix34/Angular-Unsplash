import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PhotosState } from './shared/store/photos.reducer';
import { photosResultsSelector } from './shared/store/photos.selectors';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public photos$: Observable<any>;

  constructor(private store: Store<PhotosState>) { }

  ngOnInit(): void {
    this.photos$ = this.store.pipe(select(photosResultsSelector));
  }

}
