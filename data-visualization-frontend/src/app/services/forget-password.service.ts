import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class ForgetPasswordService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  resetPassword(formData: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    
    return this.http.post(`${this.apiUrl}/user/forgot-password`, formData, { headers, responseType: 'text' });
  }
}
