import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.baseUrl + 'user/';
  refreshTokenInterval: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(this.apiUrl + 'registration', data);
  }

  login(data: any) {
    return this.http.put(this.apiUrl + 'login', data);
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
