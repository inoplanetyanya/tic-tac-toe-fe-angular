import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DEFAULT_BUTTON_TEXT,
  DEFAULT_ERROR_TEXT,
  DEFAULT_TITLE,
  inputsPlaceholders,
  RegistrationFormFields,
  MIN_PASSWORD_LENGTH,
  validationErrors,
} from './registration-form.consts';
import { AppButton } from '~shared/ui/app-button/app-button';
import { AppInput } from '~shared/ui/app-input/app-input';
import {
  createPasswordMatchValidator,
} from '~features/auth/registration-form/registration-form.utils';
import { RegisterRequest } from '~api/auth/auth.service.types';

@Component({
  selector: 'registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppInput, AppButton],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
})
export class RegistrationForm {
  submitted = output<RegisterRequest>();

  title = input<string>(DEFAULT_TITLE);
  buttonText = input<string>(DEFAULT_BUTTON_TEXT);

  protected readonly Fields = RegistrationFormFields;

  private passwordControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)],
  });

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: this.passwordControl,
    passwordConfirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, createPasswordMatchValidator(this.passwordControl)],
    }),
  });

  private getFieldValue(field: RegistrationFormFields): string {
    const control = this.form.get(field);

    if (!control) {
      return '';
    }

    return control.value;
  }

  private getFieldError(field: RegistrationFormFields): string {
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

  private onChangeField(field: RegistrationFormFields, value: string): void {
    const control = this.form.get(field);

    if (!control) {
      return;
    }

    control.setValue(value);
    control.markAsTouched();
  }

  private getInputPlaceholder(field: RegistrationFormFields): string {
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

      passwordConfirm: {
        placeholder: this.getInputPlaceholder(this.Fields.PASSWORD_CONFIRM),
        value: this.getFieldValue(this.Fields.PASSWORD_CONFIRM),
        error: this.getFieldError(this.Fields.PASSWORD_CONFIRM),
        onChange: (value: string) => this.onChangeField(this.Fields.PASSWORD_CONFIRM, value),
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
