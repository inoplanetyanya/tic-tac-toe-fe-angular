import { Injectable, inject, signal } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from './auth.service.types';
import { API_BASE_URL } from '../base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly _accessToken = signal<string | null>(null);
  public readonly accessToken = this._accessToken.asReadonly;

  loginMutation = injectMutation(() => ({
    mutationFn: (body: LoginRequest) => {
      return lastValueFrom(this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, body));
    },
    onSuccess: (response: LoginResponse) => {
      this._accessToken.set(response.token_access);
    },
  }));

  registerMutation = injectMutation(() => ({
    mutationFn: (body: RegisterRequest) => {
      return lastValueFrom(this.http.post<RegisterRequest>(`${API_BASE_URL}/auth/register`, body));
    },
  }));

  public logout(): void {
    this._accessToken.set(null);
  }
}
