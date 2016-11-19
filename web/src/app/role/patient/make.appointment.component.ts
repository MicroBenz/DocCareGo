import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MakeAppointmentFormComponent } from './../../shared/appointment/make.appointment.form.component';
import { Title } from '@angular/platform-browser';
import { MAKE_APPOINTMENT_TITLE } from './../../config/title.config';

import { Clinic } from '../../shared/appointment/clinic.component';
import { Doctor } from '../../shared/appointment/doctor.component';
import { Workday } from '../../shared/appointment/workday.component';
import { DataService } from '../../shared/service/data.service';
import { CLINIC_ENDPOINT, DOCTOR_ENDPOINT, WORKDAY_ENDPOINT, APPOINTMENT_ENDPOINT } from '../../config/api.config';

import * as moment from 'moment';
import { AuthService } from '../../shared/service/auth.service';

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
        .appointment-form  .columns .column .select{
            width: 100%;
        }
        .appointment-form  .columns .column .select select{
            width: 100%;
        }
    `]
})
export class MakeAppointmentComponent implements OnInit {
    @ViewChild(MakeAppointmentFormComponent) private makeAppointmentForm: MakeAppointmentFormComponent;

    public clinicList;
    public doctorList;
    private appointmentData = {};
    public selectedClinicIndex;
    public selectedDoctorIndex;
    public selectedClinic;
    public selectedDoctor;
    public selectedTimeSlot;
    public causeToAppointment: string;
    public isConfirmedAppointmentDetail: boolean;
    public isConfirmedTimeSlot: boolean;    
    public allTimeSlot;

    constructor(private router: Router, private title: Title, private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.title.setTitle(MAKE_APPOINTMENT_TITLE);
        this.clinicList = [];
        this.doctorList = [];  
        this.selectedDoctorIndex = '-1';
        this.selectedClinicIndex = '-1';
        this.selectedClinic = {};
        this.selectedDoctor = {};   
        this.selectedTimeSlot = {};     
        this.causeToAppointment = ''; 
        this.isConfirmedAppointmentDetail = false;
        this.isConfirmedTimeSlot = false;
        this.allTimeSlot = []; 
        this.dataService.getData(CLINIC_ENDPOINT)
            .subscribe(
                (success) => {
                    this.clinicList = success;
                }
            )
    }

    // clinics = CLINICS;
    // selectClinic: Clinic;
    // // selectClinic: Clinic = new Clinic(0,'none');
    // doctors: Doctor[];
    // // doctor: Doctor[];
    // selectDoctor: Doctor;
    // workdays: Workday[];
    // workday: Workday[];
    // selectWorkday: Workday;
    // workdayIndex: number;
    // day: number;
    // month: string;
    // year: number;
    // time: string;
    // adfs: number;


    // getDayFromDate(date: string): number {
    //     return Number(date.substring(0, 2));
    // }

    // getMonthFromDate(date: string): string {
    //     return date.substring(3,5);
    // }

    // getYearFromDate(date: string): number {
    //     return Number(date.substring(6,10));
    // }

    // getTimeFromWorkday(time: ): string {

    // }


    onSelectClinic(index) {
        // this.selectClinic = null;
        // this.selectDoctor = null;
        // this.workdays = WORKDAYS.filter((item) => item.clinic_id == clinic_id);
        // this.doctors = Array<Doctor>();
        // this.workdayIndex = 0;
        // for (var obj of this.workdays) {
        //     var doctor = DOCTORS.filter((item) => item.id == obj.doctor_id);
        //     this.doctors.push(doctor[0]);
        // }
        // // this.doctors.push(DOCTORS[0]);
        // this.doctors = this.doctors.filter(function(elem, index, self) {
        //     return index == self.indexOf(elem);
        // });
        this.selectedDoctorIndex = '-1';
        this.selectedDoctor = {};
        this.selectedClinic = this.clinicList[Number(index)];
        this.dataService.getDataWithParams(DOCTOR_ENDPOINT, {
            clinic: this.clinicList[Number(index)]['_id']
        })
        .subscribe(
            (success) => {
                console.log(success);
                this.doctorList = success;
            }
        )
    }

    onSelectDoctor(index) {
        // this.workday = this.workdays.filter((item) => item.doctor_id == doctor_id);
        // this.adfs = doctor_id;
        // this.workdayIndex = 0;
        // this.selectWorkday = this.workday[this.workdayIndex];
        // this.day = this.getDayFromDate(this.selectWorkday.date);
        // this.month = this.getMonthFromDate(this.selectWorkday.date);
        // this.year = this.getYearFromDate(this.selectWorkday.date);
        // this.time = this.selectWorkday.time;
        this.selectedDoctor = this.doctorList[Number(index)];        
    }

    onSelectWorkDay(clinic_id, doctor_id): void {
        // this.selectWorkday = this.workdays.find()
    }

    confirmAppointmentDetail () {
        this.isConfirmedAppointmentDetail = true;
        this.requestAvailableTime();
    }

    private requestAvailableTime () {
        let requestOption = {};
        if (Object.getOwnPropertyNames(this.selectedDoctor).length === 0) {
            requestOption['clinic'] = this.selectedClinic['_id'];
        }
        else {
            requestOption['doctor'] = this.selectedDoctor['_id'];            
        }
        this.dataService.getDataWithParams(WORKDAY_ENDPOINT, requestOption)
            .subscribe(
                (workdays: Array<Object>) => {
                    this.allTimeSlot = workdays.map(
                        (item) => {
                            let timeToDisplay = item['time'] ===  'AM' ? '9:00 - 11:30': '13:00 - 15:00';
                            let displayDate = moment(item['date']).format('LL');
                            return {
                                id: item['_id'],
                                date: item['date'],
                                displayDate: displayDate,
                                doctor: item['doctor'],
                                time: timeToDisplay
                            }
                        }
                    )
                }
            )
    }

    public onSelectedTime (timeSlot) {
        console.log(timeSlot);
        this.isConfirmedTimeSlot = true;
        this.selectedTimeSlot = timeSlot;
    }

    makeAppointment (formData) {
        
        formData['patient'] = this.authService.getUserHN();
        console.log(formData);    
        this.dataService.saveData(APPOINTMENT_ENDPOINT, formData)
            .subscribe(
                (success) => {
                    console.log('MAKE APPOINTMENT SUCCESS');
                    console.log(success);
                }
            )    
    }
    // changeDate() {
    //     if(this.workdayIndex+1 < this.workday.length) {
    //         this.workdayIndex += 1;
    //         this.selectWorkday = this.workday[this.workdayIndex];
    //         this.day = this.getDayFromDate(this.selectWorkday.date);
    //         this.month = this.getMonthFromDate(this.selectWorkday.date);
    //         this.year = this.getYearFromDate(this.selectWorkday.date);
    //         this.time = this.selectWorkday.time;    
    //     }
        
    // }

    // cancelAppointment() {
    //     /*
    //         TODO:
    //         1) Bring Up SweetAlert with 2 button "ใช่" and "ไม่ใช่"
    //         2) Inside SweetAlert tell user that you are about to dismiss this form, are you sure?
    //         3) If user press "ใช่": navigate back to "ดูการนัดหมาย"
    //         4) If user press "ไม่" dismiss SweetAlert
    //     */
    //     this.router.navigateByUrl('/patient/view-appointment');
    // }
}