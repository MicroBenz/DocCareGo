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
        tbody .active {
            background-color: whitesmoke;
        }
        tbody td {
            cursor: default;   
        }
    `]
})
export class AppointmentTableCompact {
    @Input('appointments') appointmentData = [];
    @Input('isClearSelection') isClearSelection = true;
    @Output() onSelectRow = new EventEmitter<any>();

    private selectedIndex = 0;
    selectAppointment(idx) {
        this.onSelectRow.emit(this.appointmentData[idx]);
        this.selectedIndex = idx;
    }
}