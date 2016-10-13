import { Component } from '@angular/core';

@Component({
    selector: 'make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .cause-of-appointment {
            padding-top: 10px !important;
        }
    `]
})
export class MakeAppointmentComponent {
    public isFirstSelect: boolean = true;
    public appointmentData;

    constructor() {
        this.appointmentData = {}
    }
}