import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

let authObs: Observable<AuthResponse>;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  constructor(private authService: AuthService,private route: Router) {}

  loginMode = false;
  error: string = null;
  isLoading = false;
  successMessage: string = null;

  onChangeMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.loginMode) {
      this.isLoading = true;
      authObs = this.authService.login(email, password);
    } else {
      this.isLoading = true;
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (v) => {
        this.isLoading = false;
        this.successMessage = 'Success';
        this.error = null;
        this.route.navigate(['/recipes']);
      },
      error: (e) => {
        this.error = e;
        this.isLoading = false;
        this.successMessage = null;
      }
    });

    authForm.reset();
  }
}
