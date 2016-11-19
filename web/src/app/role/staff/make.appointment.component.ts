import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';

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
        .hn-box {
            margin-bottom: 20px;
        }
    `]
})
export class MakeAppointmentByStaffComponent implements OnInit {
    public isConfirmHN: boolean;
    public isMakeAppointmentSuccess: boolean;

    constructor() {}
    ngOnInit () {
        this.isConfirmHN = false;
        this.isMakeAppointmentSuccess = false;
    }

    confirmPatient () {
        this.isConfirmHN = true;
    }

    onConfirmAppointment (formData) {
        console.log(formData);
        this.isMakeAppointmentSuccess = true;
    }
}