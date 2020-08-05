import { Component, OnInit } from "@angular/core";
import { User } from "../shared/models/user.model";
import { Observable } from "rxjs";
import { Store, select } from '@ngrx/store';
import { State } from '../shared/store';
import { TryFetchCurrentUser } from '../shared/store/actions/auth.actions';
import { currentUserSelector } from '../shared/store/selectors/auth.selectors';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    // récupère l'utilisateur depuis le store avec un selector qui retourne un Obeservable
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    // envoyer  une action qui déclenche la requête de récupération de l'utilisateur
    this.store.dispatch(new TryFetchCurrentUser());
  }
}
