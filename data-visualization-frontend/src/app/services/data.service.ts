import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getbytype(formData: any): Observable<object> {
    return this.http.get(`${this.baseUrl}/transaction/filterwise/${formData.bank}/${formData.type}/${formData.fromDate}/${formData.toDate}`);
  }
  getbyInstitution(formData: any): Observable<object> {
    return this.http.get(`${this.baseUrl}/transaction/institution/wise/${formData.fromDate}/${formData.toDate}`);
  }
}

