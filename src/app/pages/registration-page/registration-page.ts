import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '~api/auth/auth.service';
import { RegisterRequest } from '~api/auth/auth.service.types';
import { RegistrationForm } from '~features/auth/registration-form/registration-form';
import { AppPaths } from '../../app.routes';
import { AppButton } from "~shared/ui/app-button/app-button";

@Component({
  standalone: true,
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
  selector: 'registration-page',
  imports: [RegistrationForm, AppButton],
})
export class RegistrationPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected onRegistrationSubmit(credentials: RegisterRequest): void {
    this.authService.registerMutation.mutate(credentials);
  }

  protected goToLogin() {
    this.router.navigate([AppPaths.LOGIN]);
  }
}
