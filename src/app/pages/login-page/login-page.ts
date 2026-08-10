import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '~api/auth/auth.service';
import { LoginRequest } from '~api/auth/auth.service.types';
import { LoginForm } from '~features/auth/login-form/login-form';
import { AppPaths } from '../../app.routes';
import { AppButton } from "~shared/ui/app-button/app-button";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
  imports: [LoginForm, AppButton],
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected onLoginSubmit(credentials: LoginRequest): void {
    this.authService.loginMutation.mutate(credentials);
  }

  protected goToRegistration() {
    this.router.navigate([AppPaths.REGISTRATION]);
  }
}
