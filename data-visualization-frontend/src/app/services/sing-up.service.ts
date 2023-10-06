import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class signupService {

  private baseUrl = environment.baseUrl;
  
  

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }
}
