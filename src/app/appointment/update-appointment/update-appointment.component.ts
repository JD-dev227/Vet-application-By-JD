import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentAddDto, AppointmentDto } from '../appointment.model';
import Swal from 'sweetalert2';
import { futureAppointmentValidator } from '../../validators/appointment.validators';  

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointmentId!: number;
  appointmentData!: AppointmentDto;

  // Getter for the current user role from localStorage.
  get userRole(): string | null {
    return window.localStorage.getItem('role');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointmentId = Number(this.route.snapshot.params['id']);
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d+[A-Za-z]$/)]],
      ownerName: ['', Validators.required],
      ownerSurname: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: ['']
    }, { validators: futureAppointmentValidator }); 

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      data => {
        this.appointmentData = data;
        // Patch form values with retrieved appointment details.
        this.appointmentForm.patchValue({
          patientName: data.patientName,
          animalType: data.animalType,
          ownerIdCardNumber: data.ownerIdCardNumber,
          ownerName: data.ownerName,
          ownerSurname: data.ownerSurname,
          ownerContactNumber: data.ownerContactNumber,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          appointmentDuration: data.appointmentDuration,
          reasonForAppointment: data.reasonForAppointment,
          vetNotes: data.vetNotes
        });

        
        if (this.userRole === 'RECEPTIONIST') {
          this.appointmentForm.get('vetNotes')?.disable();
          
          this.appointmentForm.get('ownerIdCardNumber')?.disable();

          // Check if the appointment is upcoming; if not, prevent editing.
          if (!this.isUpcoming(data)) {
            Swal.fire({
              icon: 'warning',
              title: 'Permission Denied',
              text: 'You can only edit upcoming appointments.'
            });
            this.router.navigate(['/appointments']);
          }
        }
      },
      error => {
        console.error('Error fetching appointment details', error);
      }
    );
  }

  // Helper method to check if an appointment is upcoming.
  isUpcoming(appointment: AppointmentDto): boolean {
    // Expected appointmentDate is "DD/MM/YYYY" and appointmentTime is "HH:MM".
    const [day, month, year] = appointment.appointmentDate.split('/');
    // Convert the appointmentDate and appointmentTime into an ISO-like string.
    const appointmentDateTime = new Date(`${year}-${month}-${day}T${appointment.appointmentTime}:00`);
    return appointmentDateTime > new Date();
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
    const formValue = { ...this.appointmentForm.value };
    formValue.appointmentDuration = Number(formValue.appointmentDuration);

    this.appointmentService.updateAppointment(this.appointmentId, formValue)
      .subscribe(() => {
        Swal.fire('Success', 'Appointment updated successfully', 'success');
        this.router.navigate(['/appointments']);
      });
  }
}
