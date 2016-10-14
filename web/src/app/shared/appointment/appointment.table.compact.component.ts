import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'appointment-table-compact',
    templateUrl: './appointment.table.compact.view.html',
    styles: [`
        .date-col {
            width: 23%;
        }
        .time-col {
            width: 21%;
        }
        .clinic-col {
            width: 56%;
        }
    `]
})
export class AppointmentTableCompact {
    public appointmentData = []

    @Input()
    set appointments(appointments) {
        this.appointmentData = appointments;
    }

    @Output() onSelectRow = new EventEmitter<number>();

    selectAppointment(idx) {
        this.onSelectRow.emit(idx);
    }
}