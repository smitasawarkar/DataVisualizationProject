import { Injectable } from '@angular/core';
import {  AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {
 

  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialCharacter = /[@$!%*?&]/.test(value);

      const valid = hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;

      return !valid
        ? {
            pattern: true,
            uppercase: !hasUppercase,
            lowercase: !hasLowercase,
            digit: !hasDigit,
            specialcase: !hasSpecialCharacter
          }
        : null;
    };
  }

  static passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.root.get('password')?.value;
    
      const repeatpass = control.value;
      //console.log(control.value);
      
      
      const  isPasswordMached = password !== repeatpass;
      
      return isPasswordMached ? {isPasswordMached } : null;
      
      
    };
  }

  static dobValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value;
      // //console.log(selectedDate);
      if (selectedDate) {
        const currentDate = new Date();
        // //console.log("currentDate"+currentDate);
        const currentDateFormatted = currentDate.toISOString().split('T')[0];
        // //console.log("currentDateFormatted"+currentDateFormatted);
        if (selectedDate > currentDateFormatted) {
          return { futureDate: true }; 
        }
      }
      return null; 
    };
  }
  

}
