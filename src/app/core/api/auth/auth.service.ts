import { Injectable, inject } from '@angular/core';
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

  loginMutation = injectMutation(() => ({
    mutationFn: (body: LoginRequest) => {
      return lastValueFrom(
        this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, body, {
          withCredentials: true,
        }),
      );
    },
  }));

  registerMutation = injectMutation(() => ({
    mutationFn: (body: RegisterRequest) => {
      return lastValueFrom(this.http.post<RegisterRequest>(`${API_BASE_URL}/auth/register`, body));
    },
  }));
}
