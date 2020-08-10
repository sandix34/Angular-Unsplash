import { Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.actions';
import { SetFilter, FetchPhotos } from 'src/app/photos/shared/store/photos.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<State> ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

  public applyFilter(filter: string) {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new FetchPhotos());
  }
}
