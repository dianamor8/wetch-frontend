import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: '[useremailAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UserAsyncValidator, multi:true}]
})
export class UserAsyncValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {    
    return this.authService.userExist(ctrl.value).pipe(      
      map(isTaken => (isTaken.user===null ?  { userNoExist: true } : null)),
      catchError((x) => of(null))
    );
  }
}