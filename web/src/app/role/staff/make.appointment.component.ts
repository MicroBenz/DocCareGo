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
    `]
})
export class MakeAppointmentByStaffComponent implements OnInit {
    public isConfirmHN: boolean;

    constructor() {}
    ngOnInit () {
        this.isConfirmHN = false;
    }

    confirmPatient () {
        this.isConfirmHN = true;
    }

    onConfirmAppointment (formData) {
        console.log(formData);
    }
}