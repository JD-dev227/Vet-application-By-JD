// src/app/login/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define request and response interfaces
export interface JwtRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  jwtToken: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/authenticate';

  constructor(private http: HttpClient) { }

  login(credentials: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
