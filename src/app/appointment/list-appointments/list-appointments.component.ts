import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentDto } from '../appointment.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AppointmentStatusPipe } from '../../pipes/appointment-status.pipe';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentStatusPipe],
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {
  appointments: AppointmentDto[] = [];
  currentRole: string | null = window.localStorage.getItem('role');

  constructor(public router: Router, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Error fetching appointments', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unable to fetch appointments. Please try again later.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Helper to check if an appointment is upcoming
  isUpcoming(appointment: AppointmentDto): boolean {
    // Suppose appointmentDate is in "DD/MM/YYYY" and appointmentTime "HH:MM"
    const [day, month, year] = appointment.appointmentDate.split('/');
    const appointmentDateTime = new Date(`${year}-${month}-${day}T${appointment.appointmentTime}:00`);
    return appointmentDateTime > new Date();
  }

  deleteAppointment(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This appointment will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(id).subscribe(() => {
          Swal.fire('Deleted!', 'Appointment has been deleted.', 'success');
          this.fetchAppointments();
        });
      }
    });
  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.appointments);
    const workbook: XLSX.WorkBook = { Sheets: { 'Appointments': worksheet }, SheetNames: ['Appointments'] };
    XLSX.writeFile(workbook, 'appointments.xlsx');
  }

  exportPDF(): void {
    const doc = new jsPDF();
    const columns = ['ID', 'Patient Name', 'Animal Type', 'Owner Name', 'Owner Surname', 'Date', 'Time', 'Duration'];
    const rows = this.appointments.map(a => {
      // Appointment date in "DD/MM/YYYY"; we assume appointmentTime is "HH:MM"
      return [
        a.appointmentId,
        a.patientName,
        a.animalType,
        a.ownerName,
        a.ownerSurname,
        a.appointmentDate,
        a.appointmentTime,
        a.appointmentDuration
      ];
    });
    autoTable(doc, {
      head: [columns],
      body: rows
    });
    doc.save('appointments.pdf');
  }
}
