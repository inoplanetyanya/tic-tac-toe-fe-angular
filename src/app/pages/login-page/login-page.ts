import { Component } from '@angular/core';
import { LoginForm } from '~features/auth/login-form/login-form';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
  imports: [LoginForm],
})
export class LoginPage {}
