import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.baseUrl + 'admin/';

  constructor(private http: HttpClient, private router: Router) {}

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
        this.router.navigateByUrl('/admin');
      })
    );
  }
}
