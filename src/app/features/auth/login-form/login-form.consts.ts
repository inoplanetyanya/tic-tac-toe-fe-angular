import { ValidationErrors, Validators } from '@angular/forms';

export const DEFAULT_TITLE = 'Login';
export const DEFAULT_BUTTON_TEXT = 'Login';

export const MIN_PASSWORD_LENGTH = 2;

export type LoginFormFields = 'email' | 'password';

export const LoginFormFields = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const DEFAULT_ERROR_TEXT = 'Error';
const fieldIsRequired = 'This field is required';

type LoginFormValidationErrors = Record<string, string>;

const emailValidationErrors: LoginFormValidationErrors = {
  required: fieldIsRequired,
  email: 'Invalid email format',
};

const passwordValidationErrors: LoginFormValidationErrors = {
  required: fieldIsRequired,
  minlength: `Minimum length is ${MIN_PASSWORD_LENGTH} characters`,
};

export const validationErrors = {
  email: emailValidationErrors,
  password: passwordValidationErrors,
};

export const inputsPlaceholders = {
  email: 'E-mail',
  password: 'Password',
};
