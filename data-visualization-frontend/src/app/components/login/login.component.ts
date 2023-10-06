import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidationService } from 'src/app/services/password-validation.service';
import { signinServiceService } from 'src/app/services/singin-service.service';
import Swal from 'sweetalert2';

// import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isFormHighlighted: boolean = false;
  submitted = true;
  
  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
       PasswordValidationService.passwordValidator()
    ])
  });

   toggleFormHighlight() {
    this.isFormHighlighted = !this.isFormHighlighted;
  }

  get d() {
    return this.loginform.controls;
  }
  
  get email() {
    return this.loginform.get('email');
  }
  
  get password() {
    return this.loginform.get('password');
  }

 constructor(private signinServiceService:signinServiceService, public router: Router, ){}
  loginResponse:any;
  async onSubmit(){
    this.submitted = true;
    if (this.loginform.valid) {
      const formData = {
        email: this.loginform.value.email,
        password: this.loginform.value.password,
      };
        const response = this.signinServiceService.login(formData).subscribe((res) => {
          this.loginResponse = res;
          //console.log(this.loginResponse);
          Swal.fire({
            icon: 'success',
            title: `Welcome ${this.loginResponse.firstName}... `,
            text: 'Sign In Successfully',
          });
          //console.log("response: ", this.loginResponse);
          sessionStorage.setItem('userId', this.loginResponse.userId);
          sessionStorage.setItem('loginId', this.loginResponse.loginId);
          sessionStorage.setItem('userName', this.loginResponse.firstName);
          if (
            this.loginform.value.email === "gunder@maveric-systems.com" ||
            this.loginform.value.email === "nike@gmail.com" ||
            this.loginform.value.email === "nikhil@gmail.com" ||
            this.loginform.value.email === "amsika97@gmail.com"
          ) {
            sessionStorage.setItem('usertype', 'Admin');
          } else {
            sessionStorage.setItem('usertype', 'User');
          }
           this.router.navigate(['home/dashboard']);
        },
          error => {
            const errorMessage = error?.error?.message || 'An error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: `${errorMessage}`,
            });
            // alert("User SignIn failed: " + errorMessage);
            // alert("User register failed");
            console.error('Registration error:', error);
          });
  }else {
    Swal.fire({
      icon: 'info',
      title: 'Sorry...',
      text: 'Please enter the mandatory field!',
    })
    Object.keys(this.loginform.controls).forEach(key => {
      this.loginform.get(key)?.markAsTouched();
    });
  }
  
}

}
