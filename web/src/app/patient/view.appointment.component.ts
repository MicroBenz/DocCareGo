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
    public testAppointment = [
        {'date': '11 ม.ค. 2559', 'time': '13:00-15:00', 'clinic': 'หนึ่งเดียวเท่านั้น'},
    ]
}