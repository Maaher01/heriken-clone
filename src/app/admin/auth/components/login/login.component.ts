import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  responseData: any;
  errorResponse!: string;

  adminLoginForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  loginAdmin() {
    if (this.adminLoginForm.valid) {
      this.adminService.login(this.adminLoginForm.value).subscribe(
        (result) => {
          if (result != null) {
            this.responseData = result;
            localStorage.setItem('token', this.responseData.token);
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.errorResponse = err.error.message;
        }
      );
    }
  }
}
