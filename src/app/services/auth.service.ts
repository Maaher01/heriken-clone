import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
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
  
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')));
  currentUser$ = this.currentUserSubject.asObservable();

  register(data: any) {
    return this._httpClient.post(BASE_API_URL + 'registration', data).pipe(
      catchError(this.handleError)
    );
  }

  login(payload: UserLoginRequestBody): Observable<{ data: User }> {
    return this._httpClient
      .post<{ token: string }>(BASE_API_URL + 'login', payload)
      .pipe(
        tap((loginResponse) => {
          localStorage.setItem('token', loginResponse.token);
        }),
        switchMap((_loginResponse) =>
          this.getUserInfo().pipe(
            tap((userInfo) => {
              localStorage.setItem('user', JSON.stringify(userInfo.data));
            })
          )
        ),
        catchError(this.handleError)
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
          this._router.navigateByUrl('/user/login');
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    setTimeout(() => {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenInterval = null;
      this._router.navigate(['/user/login']);
    }, 1000);
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {}
    errorResponse['status'] = response.status
    errorResponse['message'] = response.message
    return throwError(() => errorResponse)
  }
}
