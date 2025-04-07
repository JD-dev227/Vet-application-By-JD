// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Instead of accessing localStorage immediately, we check if window is defined.
  private _currentRole: 'RECEPTIONIST' | 'VET' | 'ADMIN' | null = 
    typeof window !== 'undefined' ? window.localStorage.getItem('role') as ('RECEPTIONIST' | 'VET' | 'ADMIN' | null) : null;

  get currentRole(): 'RECEPTIONIST' | 'VET' | 'ADMIN' | null {
    // In case the role might change, we read it from localStorage at runtime.
    return typeof window !== 'undefined' ? window.localStorage.getItem('role') as ('RECEPTIONIST' | 'VET' | 'ADMIN' | null) : null;
  }

  constructor() { }
}
