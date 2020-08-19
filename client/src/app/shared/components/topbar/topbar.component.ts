import { Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.actions';
import { SetFilter, FetchPhotos } from 'src/app/photos/shared/store/photos.actions';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public searchForm: FormGroup;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

  /*public applyFilter(filter: string) {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new FetchPhotos());
  }*/

  public submit(): void {
    console.log(this.searchForm);
    
  }
}
