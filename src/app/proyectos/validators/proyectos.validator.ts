import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export const checkEquality: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const frente = control.get('frente');
//     const fondo = control.get('fondo');
//     return password && confirm_password && password.value != confirm_password.value ? { noEquals: true } : null;
//   };