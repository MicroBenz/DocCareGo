import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeAppointmentFormComponent } from './../../shared/appointment/make.appointment.form.component';
import { Title } from '@angular/platform-browser';
import { MAKE_APPOINTMENT_TITLE } from './../../config/title.config';

import { Clinic } from '../../shared/appointment/clinic.component';
import { Doctor } from '../../shared/appointment/doctor.component';
import { Workday } from '../../shared/appointment/workday.component';

const CLINICS: Clinic[] = [
    {id:1 ,name: "คลินิกทางเดินอาหาร"},
    {id:2 ,name: "คลินิกหัวใจ"},
    {id:3 ,name: "คลินิกทางผ่าน"}
];

const DOCTORS: Doctor[] = [
    new Doctor(1, 'นายแพทย์ธีรัช รักษ์เถา'),
    new Doctor(2, 'นายแพทย์ธนนันท์ ตั้งธนาชัยกุล'),
    new Doctor(3, 'นายแพทย์ธนวัฒน์ เค้าฉลองเคียง')
];

const WORKDAYS: Workday[] = [
    new Workday(1, 1, 1, '10/11/2559', '13:00 - 13:30'),
    new Workday(2, 1, 1, '11/11/2559', '13:30 - 14:00'),
    new Workday(3, 1, 1, '10/11/2559', '14:00 - 14:30'),
    new Workday(4, 1, 1, '10/11/2559', '14:30 - 15:00'),
    new Workday(5, 2, 1, '10/11/2559', '12:00 - 12:30'),
    new Workday(6, 2, 1, '10/11/2559', '13:30 - 14:00'),
    new Workday(7, 2, 1, '10/11/2559', '14:00 - 14:30'),
    new Workday(8, 3, 2, '10/11/2559', '15:00 - 15:30'),
    new Workday(9, 3, 2, '10/11/2559', '15:30 - 16:00'),
    new Workday(10, 3, 2, '10/11/2559', '16:00 - 16:30'),
    new Workday(11, 3, 2, '10/11/2559', '16:30 - 17:00')
];

@Component({
    selector: 'make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .box {
            margin-bottom: 25px;           
        }
        tile is-child box{
            background-color: green;
        }
        .none {
            display: block;
            font-size: 50px;
            text-align: center;
        }
        .day {
            display: block;
            font-size: 48px;
            text-align: center;
            
        }
        .month {
            display: block;
            font-size: 48px;
            text-align: center;
        }
        .year {
            display: block;
            font-size: 48px;
            text-align: center;
        }
        .time {
            display: block;
            font-size: 48px;
            text-align: center;
        }
    `]
})
export class MakeAppointmentComponent {
    @ViewChild(MakeAppointmentFormComponent) private makeAppointmentForm: MakeAppointmentFormComponent;
    private appointmentData = {};

    constructor(private router: Router, private title: Title) {
        title.setTitle(MAKE_APPOINTMENT_TITLE);
    }

    clinics = CLINICS;
    selectClinic: Clinic;
    // selectClinic: Clinic = new Clinic(0,'none');
    doctors: Doctor[];
    // doctor: Doctor[];
    selectDoctor: Doctor;
    workdays: Workday[];
    workday: Workday[];
    selectWorkday: Workday;
    workdayIndex: number;
    day: number;
    month: string;
    year: number;
    time: string;
    adfs: number;


    getDayFromDate(date: string): number {
        return Number(date.substring(0, 2));
    }

    getMonthFromDate(date: string): string {
        return date.substring(3,5);
    }

    getYearFromDate(date: string): number {
        return Number(date.substring(6,10));
    }

    // getTimeFromWorkday(time: ): string {

    // }


    onSelectClinic(clinic_id): void {
        this.selectClinic = null;
        this.selectDoctor = null;
        this.workdays = WORKDAYS.filter((item) => item.clinic_id == clinic_id);
        this.doctors = Array<Doctor>();
        this.workdayIndex = 0;
        for (var obj of this.workdays) {
            var doctor = DOCTORS.filter((item) => item.id == obj.doctor_id);
            this.doctors.push(doctor[0]);
        }
        // this.doctors.push(DOCTORS[0]);
        this.doctors = this.doctors.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        
    }

    onSelectDoctor(doctor_id): void {
        this.workday = this.workdays.filter((item) => item.doctor_id == doctor_id);
        this.adfs = doctor_id;
        this.workdayIndex = 0;
        this.selectWorkday = this.workday[this.workdayIndex];
        this.day = this.getDayFromDate(this.selectWorkday.date);
        this.month = this.getMonthFromDate(this.selectWorkday.date);
        this.year = this.getYearFromDate(this.selectWorkday.date);
        this.time = this.selectWorkday.time;
    }

    onSelectWorkDay(clinic_id, doctor_id): void {
        // this.selectWorkday = this.workdays.find()
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
        */
        this.appointmentData = {
            date: this.makeAppointmentForm.appointmentData['date'],
            time: this.makeAppointmentForm.appointmentData['time'],
            doctor: this.makeAppointmentForm.appointmentData['doctor'],
            cause: this.makeAppointmentForm.appointmentData['cause']
        };
        console.log(this.appointmentData);
        // this.router.navigateByUrl('/patient/view-appointment');    
    }

    changeDate() {
        if(this.workdayIndex+1 < this.workday.length) {
            this.workdayIndex += 1;
            this.selectWorkday = this.workday[this.workdayIndex];
            this.day = this.getDayFromDate(this.selectWorkday.date);
            this.month = this.getMonthFromDate(this.selectWorkday.date);
            this.year = this.getYearFromDate(this.selectWorkday.date);
            this.time = this.selectWorkday.time;    
        }
        
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