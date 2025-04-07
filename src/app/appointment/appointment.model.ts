
import { AbstractControl } from "@angular/forms";

// src/app/appointment/appointment.model.ts
export interface AppointmentAddDto {
    animalType: string;
    appointmentDate: string;      // e.g., "2025-04-29"
    appointmentTime: string;      // e.g., "20:26"
    appointmentDuration: number;
    ownerContactNumber: string;
    ownerIdCardNumber: string;
    ownerName: string;
    ownerSurname: string;
    patientName: string;
    reasonForAppointment: string;
    vetNotes: string;
  }
  
  
  // Model for retrieved appointments (response payload)
  export interface AppointmentDto {
    appointmentId: number;
    animalType: string;
    appointmentDate: string;
    appointmentDuration: number;
    appointmentTime: string;
    ownerContactNumber: string;
    ownerIdCardNumber: string;
    ownerName: string;
    ownerSurname: string;
    patientName: string;
    reasonForAppointment: string;
    vetNotes: string;
  }
 

  export function futureDateTimeValidator(control: AbstractControl): { [key: string]: any } | null {
    const dateTimeValue = control.value;
    if (!dateTimeValue) {
      return null; // Required validator should catch empty values.
    }
    const selectedDateTime = new Date(dateTimeValue);
    const now = new Date();
    return selectedDateTime <= now ? { pastDateTime: true } : null;
  }
