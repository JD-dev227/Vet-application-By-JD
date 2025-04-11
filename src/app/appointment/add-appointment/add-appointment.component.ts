import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentAddDto } from '../appointment.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { futureAppointmentValidator } from '../../validators/appointment.validators';  // adjust the path as needed

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;

  // Simple getter to get the user role from localStorage (assumes window is defined)
  get userRole(): string | null {
    return window.localStorage.getItem('role');
  }

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    // If the current user is a receptionist, disable the vetNotes field.
    if (this.userRole === 'RECEPTIONIST') {
      this.appointmentForm.get('vetNotes')?.disable();
    }
  }
  
  submitForm(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
    
    const formValue = { ...this.appointmentForm.value };

    // Ensure appointmentDuration is a number.
    formValue.appointmentDuration = Number(formValue.appointmentDuration);
    
    // Convert the appointmentDate from "YYYY-MM-DD" to "DD/MM/YYYY"
    if (formValue.appointmentDate) {
      const dateParts = formValue.appointmentDate.split('-'); // [YYYY, MM, DD]
      if (dateParts.length === 3) {
        formValue.appointmentDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      }
    }
    
    // Log the payload for debugging.
    console.log("Payload to be sent:", formValue);
    
    // The backend expects:
    // appointmentDate: "DD/MM/YYYY" and appointmentTime: "HH:MM"
    this.appointmentService.addAppointment(formValue)
      .subscribe(
        (response) => {
          this.router.navigate(['/appointments']);
          Swal.fire({
            title: "Appointment added",
            icon: "success",
            toast: true,
            position: "top"
          });
        },
        (error) => {
          console.error("Error adding appointment", error);
        }
      );
  }
}
