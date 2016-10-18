import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeAppointmentFormComponent } from './../../shared/appointment/make.appointment.form.component';
import { Title } from '@angular/platform-browser';
import { MAKE_APPOINTMENT_TITLE } from './../../config/title.config';

@Component({
    selector: 'staff-make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .appointment-button {
            margin-top: 15px;
        }
    `]
})
export class MakeAppointmentByStaffComponent {
    @ViewChild(MakeAppointmentFormComponent) private makeAppointmentForm: MakeAppointmentFormComponent;
    private appointmentData = {};
    private patient;

    constructor(private router: Router, private title: Title) {
        title.setTitle(MAKE_APPOINTMENT_TITLE);
    }

    makeAppointment () {
        this.appointmentData = {
            patient: this.patient,
            date: this.makeAppointmentForm.appointmentData['date'],
            time: this.makeAppointmentForm.appointmentData['time'],
            doctor: this.makeAppointmentForm.appointmentData['doctor'],
            cause: this.makeAppointmentForm.appointmentData['cause']
        };     
        console.log(this.appointmentData);
        this.router.navigateByUrl('/staff/manage-appointment');
    }

    cancelAppointment () {
        // TODO: Use this.appointmentData to get form data        
        this.router.navigateByUrl('/staff/manage-appointment');
    }
}