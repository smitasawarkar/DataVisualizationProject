import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordValidationService } from 'src/app/services/password-validation.service';
import { Router } from '@angular/router';
import {signupService} from 'src/app/services/sing-up.service'
import { CountryDataService } from 'src/app/services/country-code.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  
  submitted=true;
  passwordMatched: boolean = false;
  countryCode: { code: string; name: string; }[];



  verifyPassword() {
    const password = (<HTMLInputElement>document.getElementById("pwd")).value;
    const cPassword = (<HTMLInputElement>document.getElementById("repeatPwd")).value;
  
    this.passwordMatched = password === cPassword;
  }
  registerform= new FormGroup({ 
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('', [Validators.required,Validators.email]),
    countryCode: new FormControl ( '', Validators.required),
    contactNo:new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    adharCard:new FormControl('',[Validators.required,Validators.pattern(/^\d{12}$/)]),
    gender:new FormControl('',Validators.required),
    dob:new FormControl('',[Validators.required, PasswordValidationService.dobValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordValidationService.passwordValidator()
    ]),
    repeatpass:new FormControl('', [Validators.required, 
      PasswordValidationService.passwordMatchValidator()]) 
  } );

  constructor( private signupService:signupService, public router: Router, private countryDataService: CountryDataService){
      this.countryCode = this.countryDataService.countryCodes;
    }

    onregsubmit() {
      this.submitted = true;
      //console.log("onsubmit call")

      
      if (this.registerform.valid) {
        const formData: any = this.registerform.value;
        formData.address = { homeAddress: "Home address", officeAddress: " " }
        //console.log(formData);
  
        this.signupService.registerUser(formData).subscribe(
          response => {
            const firstName = formData.firstName;
            Swal.fire({
              icon: 'success',
              title: `Hi.. ${firstName}`,
              text: 'Registration is succesfull',
            })
            // alert("User register succesfully");
            // //console.log('Registration success:', response);
            this.router.navigate(['signin']);
          },
          error => {
            const errorMessage = error?.error?.error || 'An error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: `${errorMessage}`,
            })
            // alert("User registration failed: " + errorMessage);
            // alert("User register failed");
            console.error('Registration error:', error);
          }
        );
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Sorry...',
          text: 'Please enter the mandatory field!',
        })
        Object.keys(this.registerform.controls).forEach(key => {
          this.registerform.get(key)?.markAsTouched();
        });
      }
    }


  get firstName()
  {
   return this.registerform.get('firstName')
  }
  get lastName(){
   return this.registerform.get('lastName')
  }
  get email()
  {
   return this.registerform.get('email')
  }
  get contactNo(){
   return this.registerform.get('contactNo')
  }
  get adharCard()
  {
   return this.registerform.get('adharCard')
  }
  get gender(){
   return this.registerform.get('gender')
  }
  get dob()
  {
   return this.registerform.get('dob')
  }
  get password(){
   return this.registerform.get('password')
  }
  
  get repeatpass(){
   return this.registerform.get('repeatpass')
  }

}
