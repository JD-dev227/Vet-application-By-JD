import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentAddDto } from '../appointment.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { futureDateTimeValidator } from '../appointment.model';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;

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
    });
  }
  

  submitForm(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
    
    
    const formValue = { ...this.appointmentForm.value };
    
    
    console.log("Original form value:", formValue);
    
    // Ensure appointmentDuration is a number.
    formValue.appointmentDuration = Number(formValue.appointmentDuration);
    
    // Convert the appointmentDate from "YYYY-MM-DD" to "DD/MM/YYYY"
    if (formValue.appointmentDate) {
      const dateParts = formValue.appointmentDate.split('-'); // [YYYY, MM, DD]
      if (dateParts.length === 3) {
        formValue.appointmentDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      }
    }
    
    // Log the payload to verify the conversion.
    console.log("Payload to be sent:", formValue);
    
    // Now send the payload to the backend. The API expects:
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
  get userRole(): string | null {
    return window.localStorage.getItem('role');
  }
}

