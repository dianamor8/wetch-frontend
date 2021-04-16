import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

// @Injectable({ providedIn: 'root' })
@Directive({
  selector: '[emailAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: MyAsyncValidator, multi:true}]
})
export class MyAsyncValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {    
    return this.authService.userExist(ctrl.value).pipe(      
      map(isTaken => (isTaken ? { userExist: true } : null)),
      catchError((x) => of(null))
    );
  }
}