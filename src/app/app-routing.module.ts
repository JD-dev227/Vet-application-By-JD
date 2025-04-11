import { Routes } from '@angular/router';
import { LoginComponent } from './appointment/login/login.component';
import { ListAppointmentsComponent } from './appointment/list-appointments/list-appointments.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './appointment/update-appointment/update-appointment.component';
import { ViewAppointmentDetailsComponent } from './appointment/view-appointment-details/view-appointment-details.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: ListAppointmentsComponent },
  { 
    path: 'add-appointment', 
    component: AddAppointmentComponent, 
    canActivate: [RoleGuard],
    data: { expectedRoles: ['RECEPTIONIST', 'ADMIN'] }  // Note: vets are not allowed to add appointments
  },
  { 
    path: 'update-appointment/:id', 
    component: UpdateAppointmentComponent, 
    canActivate: [RoleGuard],
    data: { expectedRoles: ['RECEPTIONIST', 'VET', 'ADMIN'] }
  },
  { path: 'appointment/:id', component: ViewAppointmentDetailsComponent }
];
