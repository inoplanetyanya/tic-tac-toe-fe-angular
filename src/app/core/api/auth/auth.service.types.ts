export interface LoginRequest {
  identity: string;
  password: string;
}

export interface LoginResponse {
  token_access: string;
}

export interface RegisterRequest {
  email: string;
  username?: string;
  password: string;
  passwordConfirm: string;
}
