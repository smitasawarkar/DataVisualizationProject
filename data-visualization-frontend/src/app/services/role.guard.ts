import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class roleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    //console.log("calling");
    let role = sessionStorage.getItem('usertype'); 
    //console.log('Role:', role);

    if (role === 'Admin') {
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: `Sorry... `,
      text: 'Access Denied',
    });
    this.router.navigate(['home/dashboard']);
    return false;
  }
}
