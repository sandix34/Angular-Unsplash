import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { JwtToken } from '../models/JwtToken.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });
  subscription: Subscription;

  constructor(private http: HttpClient, private router: Router) { 
    this.initToken();
    this.subscription = this.initTimer();
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials);
  }


  public initTimer() {
  return timer(2000, 5000).pipe(
    switchMap(() => {
      if (localStorage.getItem('jwt')) {
        return this.http.get<string>('/api/auth/refresh-token').pipe(
          tap((token: string) => {
            this.jwtToken.next({
              isAuthenticated: true,
              token: token
            });
            localStorage.setItem('jwt', token);
          })
        );
      } else {
        this.subscription.unsubscribe();
        return of(null);
      }
    })
  ).subscribe(() => {}, err => {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.subscription.unsubscribe();
  });
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
