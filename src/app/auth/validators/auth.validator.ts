import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';


// export function checkEquality(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//         console.log(control +">>>.")
//       const forbidden = control.get('password').value === control.get('confirm_password').value;
//       return forbidden ? null : {noEquals: {value: true}};
//     };
//   }
  
export const checkEquality: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  return password && confirm_password && password.value != confirm_password.value ? { noEquals: true } : null;
};

// export function checkPasswords(group: FormGroup) {
//     const pass = group.controls.password.value;
//     const confirmPass = group.controls.confirm_password.value;

//     return pass === confirmPass ? null : { equals: true };
// }

// export const checkEquality: ValidatorFn = (control: AbstractControl): ValidationErrors | null  => {
//     const password = control.get('password');
//     const repeat_password = control.get('confirm_password');

//     return password.value === repeat_password.value ? null : { equals: true };
// }

// export const checkPasswords(group: FormGroup) {
//     const pass = group.controls.password.value;
//     const confirmPass = group.controls.confirm_password.value;

//     return pass === confirmPass ? null : { equals: true };
// }

// export class CheckWord{
//     public static checkInvalidWord(mask: RegExp): ValidatorFn{
//         return (control: AbstractControl): { [key: string]: any } | null  => {
//             const invalid = mask.test(control.value);
//             return invalid ? { 'invalidWord': { value: control.value } } : null;
//         }
//     }
// }