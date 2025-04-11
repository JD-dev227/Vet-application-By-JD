import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { 
    path: 'appointments', 
    loadComponent: () => import('./appointment/list-appointments/list-appointments.component').then(m => m.ListAppointmentsComponent) 
  },
  { 
    path: 'add-appointment', 
    loadComponent: () => import('./appointment/add-appointment/add-appointment.component').then(m => m.AddAppointmentComponent) 
  },

];
