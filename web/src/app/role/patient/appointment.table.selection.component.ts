import { Component } from '@angular/core';

@Component({
    selector: 'appointment-table-selection',
    templateUrl: './appointment.table.selection.view.html',
    styles: [`
        .table {
            margin-bottom: 0px;
        }
        .button {
            margin-bottom: 10px;
            margin-right: 5px;
        }
    `]
})
export class AppointmentTableSelectionComponent {
    public timeTable = [
        {
            date: 'วันที่ 18 สิงหาคม 2559',
            time: [
                '13:00 - 13:30',
                '13:30 - 14:00',
                '14:00 - 14:30',
                '14:30 - 15:00',
                '15:00 - 15:30',
                '15:30 - 16:00',
                '16:00 - 16:30',
                '16:30 - 17:00',
                '17:00 - 17:30',
                '17:30 - 18:00',
                '18:00 - 18:30'
            ]
        },
        {
            date: 'วันที่ 19 สิงหาคม 2559',
            time: [
                '13:00 - 13:30',
                '13:30 - 14:00',
                '14:00 - 14:30',
                '14:30 - 15:00'
            ]
        }
    ]

    selectTime (i: number, j: number) {
        console.log(this.getDateTimeByIndex(i, j));
    }

    private getDateTimeByIndex(i: number, j: number) {
        return {
            date: this.timeTable[i].date,
            time: this.timeTable[i].time[j]
        }
    }
}