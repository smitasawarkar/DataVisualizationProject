import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordValidationService } from 'src/app/services/password-validation.service';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent  {
   isFormHighlighted: boolean = false;
  submitted = true;
  showresetform = true;
  emailche: any;

  forgetform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordValidationService.passwordValidator()
    ]),
    repeatpass: new FormControl('', [Validators.required, PasswordValidationService.passwordMatchValidator()]) 
  });
  
  toggleFormHighlight() {
    this.isFormHighlighted = !this.isFormHighlighted;
  }
 
  
  get d() {
    return this.forgetform.controls;
  }

  get email() {
    return this.forgetform.get('email');
    
  }

  constructor(private ForgetPasswordService:ForgetPasswordService, public router: Router, ){}

  onclickemail(){
    this.emailche= this.forgetform.value.email
    if (this.emailche) {
      const formData = {
        email: this.forgetform.value.email,
             };
      this.ForgetPasswordService.resetPassword(formData).subscribe(
        response => {
          // //console.log(response); 
          this.showresetform = false
        },
        error => {
          const errorMessage = error?.error?.message || 'An error occurred';
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: 'Email not found',
          })
          // alert("User registration failed: " + errorMessage);
          console.error(error);
          // alert("email is not found")
        }
        );
  }else {
    Swal.fire({
      icon: 'info',
      title: 'Sorry...',
      text: 'Please enter the mandatory field!',
    })
    Object.keys(this.forgetform.controls).forEach(key => {
      this.forgetform.get(key)?.markAsTouched();
    });
  }

  }

  onSubmitpass() {
    this.submitted = true;
   
    if (this.forgetform.valid) {
      const formData = {
        email: this.forgetform.value.email,
        password: this.forgetform.value.password,
      };
      //console.log(formData);
      this.ForgetPasswordService.resetPassword(formData).subscribe(
        response => {
          
          Swal.fire({
            icon: 'success',
            title: `Yeah... `,
            text: 'Password is changed successfully',
          })
          //console.log(response); 
          // alert("The password reset was successful")
          this.router.navigate(['signin']);
        },
        error => {
          const errorMessage = error?.error?.message || 'An error occurred';
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: `${errorMessage}`,
          })
          // alert("User registration failed: " + errorMessage);
          console.error(error);
          // alert("email is not found")
        }
        );
  }else {
    Swal.fire({
      icon: 'info',
      title: 'Sorry...',
      text: 'Please enter the mandatory field!',
    })
    Object.keys(this.forgetform.controls).forEach(key => {
      this.forgetform.get(key)?.markAsTouched();
    });
  }
}

}

