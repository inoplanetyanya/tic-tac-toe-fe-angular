import { Component, inject } from '@angular/core';
import { AuthService } from '~api/auth/auth.service';
import { LoginRequest } from '~api/auth/auth.service.types';
import { LoginForm } from '~features/auth/login-form/login-form';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
  imports: [LoginForm],
})
export class LoginPage {
  private readonly authService = inject(AuthService);

  protected onLoginSubmit(credentials: LoginRequest): void {
    this.authService.loginMutation.mutate(credentials);
  }
}
