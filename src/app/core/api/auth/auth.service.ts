import { Injectable, inject, signal } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from './auth.service.types';
import { API_BASE_URL } from '../base-url';
import { Router } from '@angular/router';
import { AppPaths } from '../../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _accessToken = signal<string | null>(null);
  public get accessToken() {
    return this._accessToken;
  }

  loginMutation = injectMutation(() => ({
    mutationFn: (body: LoginRequest) => {
      return lastValueFrom(this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, body));
    },
    onSuccess: (response: LoginResponse) => {
      this._accessToken.set(response.token_access);
      this.router.navigate([AppPaths.GAMES_LIST]);
    },
  }));

  registerMutation = injectMutation(() => ({
    mutationFn: (body: RegisterRequest) => {
      return lastValueFrom(this.http.post<RegisterRequest>(`${API_BASE_URL}/auth/register`, body));
    },
  }));

  public logout(): void {
    this._accessToken.set(null);
    this.router.navigate([AppPaths.LOGIN]);
  }
}
