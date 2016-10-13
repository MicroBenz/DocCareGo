import { Component } from '@angular/core';

@Component({
    selector: 'view-appointment',
    templateUrl: './view.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class ViewAppointmentComponent {
    public appointments = [
        {'date': '11 ม.ค. 2559', 'time': '13:00-15:00', 'clinic': 'ระบบประสาทและสมอง'},
        {'date': '12 ม.ค. 2559', 'time': '13:00', 'clinic': 'ทางเดินอาหารและตับ'},
        {'date': '13 ม.ค. 2559', 'time': '13:00', 'clinic': 'GGSE'},
        {'date': '14 ม.ค. 2559', 'time': '13:00', 'clinic': 'ทดสอบแผนกยาวมากมากมากยาวโคตรๆ'}  
    ]

    public onSelectRow(idx) {
        console.log(this.appointments[idx]);
    }
}