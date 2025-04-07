// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, JwtRequest, JwtResponse } from './login.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials: JwtRequest = this.loginForm.value;
    this.loginService.login(credentials).subscribe({
      next: (response: JwtResponse) => {
        // Store token and role in localStorage
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('role', response.role);
        Swal.fire('Login Successful', '', 'success');
        // Redirect to appointment list page
        this.router.navigate(['/appointments']);
      },
      error: (error: any) => {
        console.error("Login error:", error);
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
