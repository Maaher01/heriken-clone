import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user';

const BASE_API_URL = `${environment.baseUrl}user/`;

interface UserLoginRequestBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);

  refreshTokenInterval: any;
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')));
  currentUser$ = this.currentUserSubject.asObservable();

  register(data: any) {
    return this._httpClient.post(BASE_API_URL + 'registration', data);
  }

  login(payload: UserLoginRequestBody): Observable<{ data: User }> {
    return this._httpClient
      .put<{ token: string }>(BASE_API_URL + 'login', payload)
      .pipe(
        tap((loginResponse) => {
          console.log(loginResponse);
          localStorage.setItem('token', loginResponse.token);
        }),
        switchMap((_loginResponse) =>
          this.getUserInfo().pipe(
            tap((userInfo) => {
              this.currentUserSubject.next(userInfo.data);
              localStorage.setItem('user', JSON.stringify(userInfo.data));
              console.log({ userInfo });
            })
          )
        )
      );
  }

  getUserInfo(): Observable<{ data: User }> {
    return this._httpClient.get<{ data: User }>(
      BASE_API_URL + 'logged-in-user-data'
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  forgotPassword(payload: any) {
    return this._httpClient
      .patch(BASE_API_URL + 'forgot-password', payload)
      .pipe(
        tap((res: any) => {
          localStorage.removeItem('token');
          this._router.navigateByUrl('/pages/user/login');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    setTimeout(() => {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenInterval = null;
      this._router.navigate(['/pages/user/login']);
    }, 1000);
  }
}
