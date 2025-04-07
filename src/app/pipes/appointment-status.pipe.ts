import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(dateTime: string): string {
    // Combine date and time to create a proper ISO string if needed.
    // If your API returns separate date and time, you might combine them as follows:
    // For example: "2025-04-30" and "16:56" should become "2025-04-30T16:56:00"
    // Here we assume the input is already in an ISO format or you modify as needed.
    const appointment = new Date(dateTime);
    const now = new Date();
    return appointment > now ? 'Upcoming' : 'Past';
  }
}
