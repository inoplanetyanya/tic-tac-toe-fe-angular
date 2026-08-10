export const DEFAULT_TITLE = 'Registration';
export const DEFAULT_BUTTON_TEXT = 'Register';

export const MIN_PASSWORD_LENGTH = 2;

export type RegistrationFormFields = 'email' | 'password' | 'passwordConfirm';

export const RegistrationFormFields = {
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
} as const;

export const DEFAULT_ERROR_TEXT = 'Error';
const fieldIsRequired = 'This field is required';

type RegistrationFormValidationErrors = Record<string, string>;

const emailValidationErrors: RegistrationFormValidationErrors = {
  required: fieldIsRequired,
  email: 'Invalid email format',
};

const passwordValidationErrors: RegistrationFormValidationErrors = {
  required: fieldIsRequired,
  minlength: `Minimum length is ${MIN_PASSWORD_LENGTH} characters`,
};

const passwordConfirmValidationErrors: RegistrationFormValidationErrors = {
  required: fieldIsRequired,
  mismatch: "Passwords don't match",
};

export const validationErrors = {
  email: emailValidationErrors,
  password: passwordValidationErrors,
  passwordConfirm: passwordConfirmValidationErrors,
};

export const inputsPlaceholders = {
  email: 'E-mail',
  password: 'Password',
  passwordConfirm: 'Password confirm',
};
