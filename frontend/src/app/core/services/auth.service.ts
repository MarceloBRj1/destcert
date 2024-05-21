import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/login`, credentials);
  }

  register(credentials: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/register', credentials);
  }
}
