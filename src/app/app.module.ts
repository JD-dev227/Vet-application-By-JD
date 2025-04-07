  /*
  // src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListAppointmentsComponent } from './appointment/list-appointments/list-appointments.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { UpdateAppointmentComponent } from './appointment/update-appointment/update-appointment.component';
import { ViewAppointmentDetailsComponent } from './appointment/view-appointment-details/view-appointment-details.component';
import { AppointmentStatusPipe } from './pipes/appointment-status.pipe';  // Adjust the path if needed

@NgModule({
  declarations: [
  ],
  imports: [
    HeaderComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppComponent,
    ListAppointmentsComponent,
    AddAppointmentComponent,
    UpdateAppointmentComponent,
    ViewAppointmentDetailsComponent,
    AppointmentStatusPipe
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule { }
*/