import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'appointment-table-compact',
    templateUrl: './appointment.table.compact.view.html',
    styles: [`
        .date-col {
            width: 23%;
        }
        .clinic-col {
            width: 49%;
        }
    `]
})
export class AppointmentTableCompact {
    // public appointmentData = []

    @Input('appointments') appointmentData = [];
    // set appointments(appointments) {
    //     this.appointmentData = appointments;
    // }

    @Output() onSelectRow = new EventEmitter<number>();

    selectAppointment(idx) {
        this.onSelectRow.emit(this.appointmentData[idx]);
    }
}