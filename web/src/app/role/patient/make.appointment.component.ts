import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeAppointmentFormComponent } from './../../shared/appointment/make.appointment.form.component';
import { Title } from '@angular/platform-browser';
import { MAKE_APPOINTMENT_TITLE } from './../../config/title.config';

@Component({
    selector: 'make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .box {
            margin-bottom: 25px;           
        }
    `]
})
export class MakeAppointmentComponent {
    @ViewChild(MakeAppointmentFormComponent) private makeAppointmentForm: MakeAppointmentFormComponent;
    private appointmentData = {};

    constructor(private router: Router, private title: Title) {
        title.setTitle(MAKE_APPOINTMENT_TITLE);
    }

    makeAppointment() {
        /*
            TODO:
            1) Bring Up SweetAlert with 2 button "นัดหมายแพทย์" and "กลับ"
            2) Inside SweetAlert tell user about appointment information (as user put in form)
            3) If user press "นัดหมายแพทย์"
                3.1) Calling API to make appointment
                3.2) When API Response
                    a) If success: Bring success SweetAlert then navigate back to "ดูการนัดหมาย"
                    b) If fail: Bring error SweetAlert and put clientMessage field from error response
        */
        this.appointmentData = {
            date: this.makeAppointmentForm.appointmentData['date'],
            time: this.makeAppointmentForm.appointmentData['time'],
            doctor: this.makeAppointmentForm.appointmentData['doctor'],
            cause: this.makeAppointmentForm.appointmentData['cause']
        };
        console.log(this.appointmentData);
        // this.router.navigateByUrl('/patient/view-appointment');    
    }

    cancelAppointment() {
        /*
            TODO:
            1) Bring Up SweetAlert with 2 button "ใช่" and "ไม่ใช่"
            2) Inside SweetAlert tell user that you are about to dismiss this form, are you sure?
            3) If user press "ใช่": navigate back to "ดูการนัดหมาย"
            4) If user press "ไม่" dismiss SweetAlert
        */
        this.router.navigateByUrl('/patient/view-appointment');
    }
}