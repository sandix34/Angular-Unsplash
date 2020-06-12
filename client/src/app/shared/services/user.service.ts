import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable, BehaviorSubject } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

@Injectable()
export class UserService {
  // stocke l'utilisateur dans currenUser qui est un BehaviorSubject afin de pouvoir toujours accéder à la dernière valeur
  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<User> {
    // si le BehaviorSubject a une valeur on le retourne
    if (this.currentUser.value) {
      return this.currentUser;
      // sinon on fait une requête au serveur pour récupérer l'utilisateur
    } else {
      return this.http.get<User>("/api/user/current").pipe(
        // dans le tap() on passe la valeur recue du serveur au BehaviorSubject
        tap((user: User) => {
          this.currentUser.next(user);
        }),
        // on retourne le BehaviorSubject grâce à swichtMap qui permet de retourner un nouvel Observable
        switchMap(() => {
          return this.currentUser;
        })
      );
    }
  }
}
