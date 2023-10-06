import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseUrl = environment.baseUrl+'user';
  private url = this.baseUrl+"/register";
  private loginUrl = this.baseUrl+ "/login"
 
  constructor(private http: HttpClient) { }

  registerUser(registration:any){
    return this.http.post<any>(this.url, registration);
  }

  save(reg:any){
    return null;
  }
  login(loginDetails:any){
    return this.http.post<any>(this.loginUrl, loginDetails);
  }

}
