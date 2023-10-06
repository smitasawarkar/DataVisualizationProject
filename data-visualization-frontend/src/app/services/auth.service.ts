import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  ISloggedIn() {
    return !!sessionStorage.getItem('userId');
  }
}
