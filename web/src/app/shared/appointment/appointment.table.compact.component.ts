import { Component, Input } from '@angular/core';

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
    public appointmentData = [
        {'date': '11 ม.ค. 2559', 'time': '13:00-15:00', 'clinic': 'ระบบประสาทและสมอง'},
        {'date': '12 ม.ค. 2559', 'time': '13:00', 'clinic': 'ทางเดินอาหารและตับ'},
        {'date': '13 ม.ค. 2559', 'time': '13:00', 'clinic': 'GGSE'},
        {'date': '14 ม.ค. 2559', 'time': '13:00', 'clinic': 'ทดสอบแผนกยาวมากมากมากยาวโคตรๆ'}    
    ]

    @Input()
    set appointments(appointments) {
        this.appointmentData = appointments;
    }
}