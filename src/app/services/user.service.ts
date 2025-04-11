// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  get currentRole(): 'RECEPTIONIST' | 'VET' | 'ADMIN' | null {
    return (typeof window !== 'undefined') 
      ? window.localStorage.getItem('role') as ('RECEPTIONIST' | 'VET' | 'ADMIN' | null)
      : null;
  }

  constructor() { }
}