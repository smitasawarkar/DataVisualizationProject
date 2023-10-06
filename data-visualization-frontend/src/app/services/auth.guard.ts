import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate {
  
  constructor(private Auth:AuthService, private router:Router){
    // //console.log(this.Auth.ISloggedIn());
  }
  canActivate(){
  if (this.Auth.ISloggedIn()){
  return true;
  }
  Swal.fire({
    icon: 'error',
    title: 'Sorry...',
    text: 'Please SignIn first!',
  });
  this.router.navigate(['signin']);
  return false;
}
}