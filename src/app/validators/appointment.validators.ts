// src/app/validators/appointment.validators.ts
import { FormGroup } from '@angular/forms';

export function futureAppointmentValidator(group: FormGroup): { [key: string]: boolean } | null {
  const date = group.get('appointmentDate')?.value;
  const time = group.get('appointmentTime')?.value;
  if (date && time) {
    // HTML input type="date" produces "YYYY-MM-DD", and type="time" gives "HH:MM".
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    if (appointmentDateTime <= new Date()) {
      return { pastDateTime: true };
    }
  }
  return null;
}
