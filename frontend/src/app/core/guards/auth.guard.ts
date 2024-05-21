import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);

  const isAuthenticated = jwtService.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return of(false);
  }
  return of(true);
};
