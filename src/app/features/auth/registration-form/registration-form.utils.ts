import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordMatchValidator(passwordControl: AbstractControl): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    if (!passwordControl || !confirmPasswordControl.value) {
      return null;
    }
    return passwordControl.value === confirmPasswordControl.value ? null : { mismatch: true };
  };
}
