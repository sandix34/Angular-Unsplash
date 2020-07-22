import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { tokenSelector } from '../store/selectors/auth.selectors';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private store: Store<State>) {
    this.store.pipe(select(tokenSelector))
        .subscribe((token: string) => this.token = token);
  }
  
  // intercepte une requête HTTP et vérifie s'il existe un token JWT dans le localStorage de l'utilisateur
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    // si token on clone la requête actuelle en lui ajoutant un headers authorization contenant le token
    if (this.token) {
      const authReq = req.clone({
        headers: req.headers.set("authorization", this.token)
      });
      // et retourne la nouvelle requête
      return next.handle(authReq);
      // sinon on ne fait rien et retourne la requête initiale
    } else {
      return next.handle(req);
    }
  }
}
