import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'appointment-table-selection',
    templateUrl: './appointment.table.selection.view.html',
    styles: [`
        .table {
            margin-bottom: 0px;
        }
        .table tr:hover {
            background-color: transparent;
        }
        .button {
            margin-bottom: 10px;
            margin-right: 5px;
        }
    `]
})
export class AppointmentTableSelectionComponent {
    @Input('timeTable') timeTable = [
        {
            date: 'วันที่ default สิงหาคม 2559 (ไปใส่ [timeTable] มาด้วย)',
            time: [
                '13:00 - 13:30',
                '13:30 - 14:00'
            ]
        }
    ];
    @Input('isClearSelection') isClearSelection = true;
    @Output() selectedTime = new EventEmitter<any>();

    public currentSelectIndex = {}

    selectTime (i: number, j: number) {
        this.currentSelectIndex['i'] = i;
        this.currentSelectIndex['j'] = j;
        this.selectedTime.emit(this.getDateTimeByIndex(i, j));
    }

    private getDateTimeByIndex(i: number, j: number) {
        return {
            date: this.timeTable[i].date,
            time: this.timeTable[i].time[j]
        }
    }
}