import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.baseUrl + 'user/';
  refreshTokenInterval: any;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  user: any;
  userData: User;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.getUserInfo();
  }

  register(data: any) {
    return this.http.post(this.apiUrl + 'registration', data);
  }

  login(data: any) {
    return this.http.put(this.apiUrl + 'login', data);
  }

  getUserInfo() {
    this.http.get(this.apiUrl + 'logged-in-user-data').subscribe({
      next: (result: any) => {
        this.userData = result.data;
        this.currentUserSubject.next(this.userData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  forgotPassword(payload: any) {
    return this.http.patch(this.apiUrl + 'forgot-password', payload).pipe(
      tap((res: any) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/pages/auth/login');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    setTimeout(() => {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenInterval = null;
      this.router.navigate(['/pages/auth/login']);
    }, 1000);
  }
}
