import { Component } from '@angular/core';

@Component({
    selector: 'view-appointment',
    templateUrl: './view.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .mini-calendar {
            margin-bottom: 20px;
        }
        .appointment-detail p {
            margin-bottom: 10px;
        }
        .appointment-detail-description {
            line-height: 24px;   
        }
    `]
})
export class ViewAppointmentComponent {
    public appointments = [
        {'date': '11/1/2559', 'time': '13:00 - 15:00', 'clinic': 'ระบบประสาทและสมอง', 'doctor': 'นายแพทย์ธีรัช รักษ์เถา'},
        {'date': '12/1/2559', 'time': '13:00 - 13:30', 'clinic': 'ทางเดินอาหารและตับ', 'doctor': 'นายแพทย์ธนนันท์ ตั้งธนาชัยกุล'},
        {'date': '13/1/2559', 'time': '11:00 - 11:30', 'clinic': 'GGSE', 'doctor': 'นายแพทย์จอห์น ชาวไร่'},
        {'date': '22/2/2559', 'time': '15:00 - 15:30', 'clinic': 'ทดสอบแผนกยาวมากมากมากยาวโคตรๆ', 'doctor': 'นายแพทย์สุเทพ กลชาญวิทย์'}
    ]

    private selectedAppointment = this.appointments[0];
    private monthMapping = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    public onSelectRow(selectedAppointment) {
        this.selectedAppointment = selectedAppointment;
    }

    private getSelectedAppointment () {
        return this.selectedAppointment;
    }

    private getSelectedAppointmentDate () {
        let dateString = this.getSelectedAppointment().date;
        let day = dateString.split('/')[0];
        let month = this.monthMapping[Number(dateString.split('/')[1]) - 1];
        let year = dateString.split('/')[2];
        return day + ' ' + month + ' ' + year;
    }
}