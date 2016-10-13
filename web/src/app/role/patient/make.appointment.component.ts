import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
            //height: calc(100vh - 140px);
        }
        .appointment-choice-wrapper {
            text-align: center;
        }
        .box {
            //max-height: 100%;            
            //overflow-y: scroll; 
            margin-bottom: 25px;           
        }
        .cause-of-appointment {
            padding-top: 10px !important;
        }
        .clinic-label {
            margin-bottom: 20px;
        }
    `]
})
export class MakeAppointmentComponent {
    public isFirstSelect: boolean = true;
    public appointmentData;
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
        },
        {
            date: 'วันที่ 20 สิงหาคม 2559',
            time: [
                '13:30 - 14:00'
            ]
        }
    ];

    constructor(private router: Router) {
        this.appointmentData = {}
    }

    onSelectTime(time) {
        console.log('[MakeAppointmentComponent] ', time);
    }

    makeAppointment() {
        /*
            TODO:
            1) Bring Up SweetAlert with 2 button "นัดหมายแพทย์" and "กลับ"
            2) Inside SweetAlert tell user about appointment information (as user put in form)
            3) If user press "นัดหมายแพทย์"
                3.1) Calling API to make appointment
                3.2) When API Response
                    a) If success: Bring success SweetAlert then navigate back to "ดูการนัดหมาย"
                    b) If fail: Bring error SweetAlert and put clientMessage field from error response
            4) If user press "กลับ" dismiss SweetAlert
        */
        this.router.navigateByUrl('/patient/view-appointment');        
    }

    cancelAppointment() {
        /*
            TODO:
            1) Bring Up SweetAlert with 2 button "ใช่" and "ไม่ใช่"
            2) Inside SweetAlert tell user that you are about to dismiss this form, are you sure?
            3) If user press "ใช่": navigate back to "ดูการนัดหมาย"
            4) If user press "ไม่" dismiss SweetAlert
        */
        this.router.navigateByUrl('/patient/view-appointment');
    }
}