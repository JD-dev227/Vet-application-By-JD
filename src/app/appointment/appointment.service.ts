/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentAddDto, AppointmentDto } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/appointment';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(this.baseUrl);
  }

  getAppointmentById(id: number): Observable<AppointmentDto> {
    return this.http.get<AppointmentDto>(`${this.baseUrl}/${id}`);
  }

  addAppointment(appointment: AppointmentAddDto): Observable<AppointmentAddDto> {
    return this.http.post<AppointmentAddDto>(this.baseUrl, appointment);
  }

  updateAppointment(id: number, appointment: AppointmentAddDto): Observable<AppointmentAddDto> {
    return this.http.put<AppointmentAddDto>(`${this.baseUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
*/
// src/app/appointment/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentAddDto, AppointmentDto } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/appointment';

  constructor(private http: HttpClient) { }

  // Helper method to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAppointments(): Observable<AppointmentDto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDto[]>(this.baseUrl, { headers });
  }

  getAppointmentById(id: number): Observable<AppointmentDto> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDto>(`${this.baseUrl}/${id}`, { headers });
  }

  addAppointment(appointment: AppointmentAddDto): Observable<AppointmentAddDto> {
    const headers = this.getAuthHeaders();
    return this.http.post<AppointmentAddDto>(this.baseUrl, appointment, { headers });
  }

  updateAppointment(id: number, appointment: AppointmentAddDto): Observable<AppointmentAddDto> {
    const headers = this.getAuthHeaders();
    return this.http.put<AppointmentAddDto>(`${this.baseUrl}/${id}`, appointment, { headers });
  }

  deleteAppointment(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
