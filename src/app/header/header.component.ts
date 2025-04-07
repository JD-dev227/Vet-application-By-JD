// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public userService: UserService, private router: Router) {}

  logout(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
