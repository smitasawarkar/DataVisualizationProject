import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class homeGuard implements CanActivate {
  
  constructor(private Auth:AuthService, private router:Router){
    
  }
  canActivate(){
  if (this.Auth.ISloggedIn()){
    this.router.navigate(['home/dashboard']);
  return false;
  }
  
  return true;
}
}
