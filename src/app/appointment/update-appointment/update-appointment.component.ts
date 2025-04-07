import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentAddDto } from '../appointment.model';
import Swal from 'sweetalert2';

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
    });

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      data => {
        // Patch the form with the retrieved data
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
      },
      error => {
        console.error('Error fetching appointment details', error);
      }
    );
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
    const formValue = { ...this.appointmentForm.value };
    formValue.appointmentDuration = Number(formValue.appointmentDuration);
    const payload: AppointmentAddDto = formValue;

    this.appointmentService.updateAppointment(this.appointmentId, payload)
      .subscribe(() => {
        Swal.fire('Success', 'Appointment updated successfully', 'success');
        this.router.navigate(['/appointments']);
      });
  }

  get userRole(): string | null {
    return window.localStorage.getItem('role');
  }
}
