import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { JwtToken } from '../models/JwtToken.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { TryRefreshToken } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(
    private http: HttpClient, 
    private router: Router,
    private store: Store<State>
    ) { 
    this.initToken();
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials);
  }


  public initRefreshToken() {
    return timer(2000, 5000).pipe(
      tap( () => {
        this.store.dispatch(new TryRefreshToken())
      })
    )
  }

  // effectue la requête pour rafraîchir le token
  public refreshToken() {
    return this.http.get<string>('api/auth/refresh-token');
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
    console.log(this.jwtToken.value);
  }

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
        token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }
  
}
