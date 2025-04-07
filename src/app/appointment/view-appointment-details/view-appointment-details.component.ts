import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AppointmentDto } from '../appointment.model';

@Component({
  selector: 'app-view-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-appointment-details.component.html',
  styleUrls: ['./view-appointment-details.component.css']
})
export class ViewAppointmentDetailsComponent implements OnInit {
  appointment?: AppointmentDto;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.appointmentService.getAppointmentById(id).subscribe(
      data => this.appointment = data,
      error => console.error('Error fetching appointment details', error)
    );
  }
}
