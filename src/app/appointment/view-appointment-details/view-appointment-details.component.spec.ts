import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentDetailsComponent } from './view-appointment-details.component';

describe('ViewAppointmentDetailsComponent', () => {
  let component: ViewAppointmentDetailsComponent;
  let fixture: ComponentFixture<ViewAppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppointmentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
