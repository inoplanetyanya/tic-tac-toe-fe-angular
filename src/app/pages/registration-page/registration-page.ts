import { Component, inject } from '@angular/core';
import { AuthService } from '~api/auth/auth.service';
import { RegisterRequest } from '~api/auth/auth.service.types';
import { RegistrationForm } from '~features/auth/registration-form/registration-form';

@Component({
  standalone: true,
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
  imports: [RegistrationForm],
})
export class RegistrationPage {
  private readonly authService = inject(AuthService);

  protected onRegistrationSubmit(credentials: RegisterRequest): void {
    this.authService.registerMutation.mutate(credentials);
  }
}
