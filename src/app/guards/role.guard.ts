// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // The route data should include an array of expectedRoles.
    const expectedRoles: string[] = route.data['expectedRoles'];
    if (expectedRoles.includes(this.userService.currentRole || '')) {
      return true;
    } else {
     
      this.router.navigate(['/appointments']);
      return false;
    }
  }
}
