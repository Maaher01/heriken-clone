import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorResponse!: string;

  userLoginForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser() {
    if (!this.userLoginForm.valid) {
      return;
    }
    this.authService.login(this.userLoginForm.getRawValue()).subscribe({
      next: (result) => {
        if (result != null) {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }
}
