// src/app/pipes/appointment-status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(combinedDateTime: string): string {
    if (!combinedDateTime) {
      return '';
    }
    
    // Expecting combinedDateTime as "DD/MM/YYYY HH:MM"
    const parts = combinedDateTime.trim().split(' ');
    if (parts.length !== 2) {
      return '';
    }
    
    const datePart = parts[0]; // e.g., "17/04/2025"
    const timePart = parts[1]; // e.g., "13:45"
    
    // Split the date into day, month, and year.
    const dateParts = datePart.split('/');
    if (dateParts.length !== 3) {
      return '';
    }
    
    const [day, month, year] = dateParts;
    
    // Convert to an ISO 8601 string: "YYYY-MM-DDTHH:MM:SS"
    const isoString = `${year}-${month}-${day}T${timePart}:00`;

    const appointmentDate = new Date(isoString);
    const now = new Date();

    // If the appointment date is greater than the current time, it's Upcoming; otherwise, Past.
    return appointmentDate > now ? 'Upcoming' : 'Past';
  }
}
