import { Component } from '@angular/core';

@Component({
    selector: 'view-appointment',
    templateUrl: './view.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .title {

        }
    `]
})
export class ViewAppointmentComponent {
    public testAppointment = []
}