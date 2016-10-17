import { Component, Input } from '@angular/core';

@Component({
    selector: 'appointment-table',
    templateUrl: './appointment.table.view.html',
    styles: [`
        .table .action-column {
            width: 28%;
        }
        .table tbody tr td {
            vertical-align: middle;
        }
        .table tbody tr td .fa {
            padding-right: 5px;
        }
    `]
})
export class AppointmentTableComponent {
    @Input('appointmentList') appointmentList = [];
}