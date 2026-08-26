import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DEFAULT_BUTTON_TEXT,
  DEFAULT_ERROR_TEXT,
  DEFAULT_TITLE,
  inputsPlaceholders,
  LoginFormFields,
  MIN_PASSWORD_LENGTH,
  validationErrors,
} from './login-form.consts';
import { AppButton } from '~shared/ui/app-button/app-button';
import { AppInput } from '~shared/ui/app-input/app-input';
import { LoginRequest } from '~api/auth/auth.service.types';
import { LoginFormOutput } from './login-form.types';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppInput, AppButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  submitted = output<LoginFormOutput>();

  title = input<string>(DEFAULT_TITLE);
  buttonText = input<string>(DEFAULT_BUTTON_TEXT);

  protected readonly Fields = LoginFormFields;

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)],
    }),
  });

  private getFieldValue(field: LoginFormFields): string {
    const control = this.form.get(field);

    if (!control) {
      return '';
    }

    return control.value;
  }

  private getFieldError(field: LoginFormFields): string {
    const control = this.form.get(field);

    if (!control) {
      return '';
    }

    if (!control.touched) {
      return '';
    }

    if (!control.errors) {
      return '';
    }

    const errors = Object.keys(control.errors);
    if (errors.length < 1) {
      return '';
    }

    const firstError = errors[0];
    const errorText = validationErrors[field][firstError];

    if (!errorText) {
      console.error(`not fount text for validation error '${firstError}'`);
    }

    return errorText ?? DEFAULT_ERROR_TEXT;
  }

  private onChangeField(field: LoginFormFields, value: string): void {
    const control = this.form.get(field);

    if (!control) {
      return;
    }

    control.setValue(value);
    control.markAsTouched();
  }

  private getInputPlaceholder(field: LoginFormFields): string {
    return inputsPlaceholders[field] ?? '';
  }

  protected get inputs() {
    return {
      email: {
        placeholder: this.getInputPlaceholder(this.Fields.EMAIL),
        value: this.getFieldValue(this.Fields.EMAIL),
        error: this.getFieldError(this.Fields.EMAIL),
        onChange: (value: string) => this.onChangeField(this.Fields.EMAIL, value),
      },

      password: {
        placeholder: this.getInputPlaceholder(this.Fields.PASSWORD),
        value: this.getFieldValue(this.Fields.PASSWORD),
        error: this.getFieldError(this.Fields.PASSWORD),
        onChange: (value: string) => this.onChangeField(this.Fields.PASSWORD, value),
      },
    };
  }

  protected get isDisabledButton() {
    return this.form.invalid;
  }

  protected onFormSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
