import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'https://localhost:44330/api/User';

  constructor(private router: Router, private http: HttpClient) {
  }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiURL}/register`, userData);
  }
  
  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<string>(`${this.apiURL}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);


  }

}
