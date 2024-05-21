import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _jwtService = inject(JwtHelperService);

  constructor() { }

  get token(): string | null {
    return localStorage.getItem(environment.token);
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem(environment.token, value);
    } else {
      localStorage.removeItem(environment.token);
    }
  }

  get payload(): JwtPayload | null {
    const token = this.token;
    if (token) {
      return this._jwtService.decodeToken<JwtPayload>(token);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const token = this.token;
    return token != null && !this._jwtService.isTokenExpired(token);
  }
}
