import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { MAKE_APPOINTMENT_TITLE } from './../../config/title.config';
import { DataService } from '../../shared/service/data.service';
import { AuthService } from '../../shared/service/auth.service';
import { CLINIC_ENDPOINT, DOCTOR_ENDPOINT, WORKDAY_ENDPOINT, APPOINTMENT_ENDPOINT } from '../../config/api.config';

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

        .fa-check-circle {
            color: green;
        }
        .notification {
            text-align: center;
            font-size: 26px;
        }
        .notification a {
            color: #000000;
        }
    `]
})
export class MakeAppointmentComponent implements OnInit {
    public clinicList;
    public doctorList;
    public selectedClinicIndex;
    public selectedDoctorIndex;
    public selectedClinic;
    public selectedDoctor;
    public selectedTimeSlot;
    public causeToAppointment: string;
    public isConfirmedAppointmentDetail: boolean;
    public isConfirmedTimeSlot: boolean;
    public isAppointmentSuccess: boolean;
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
        this.isAppointmentSuccess = false;
        this.allTimeSlot = []; 
        this.dataService.getData(CLINIC_ENDPOINT)
            .subscribe(
                (success) => {
                    this.clinicList = success;
                }
            )
    }

    onSelectClinic(index) {
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
        this.selectedDoctor = this.doctorList[Number(index)];        
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
        this.isConfirmedTimeSlot = true;
        this.selectedTimeSlot = timeSlot;
    }

    makeAppointment (formData) {
        formData['patient'] = this.authService.getUserHN();
        this.dataService.saveData(APPOINTMENT_ENDPOINT, formData)
            .subscribe(
                (success) => {
                    console.log('MAKE APPOINTMENT SUCCESS');
                    console.log(success);
                    this.isAppointmentSuccess = true;                    
                }
            )    
    }

    navigateToViewAppointment () {
        this.router.navigateByUrl('/patient/view-appointment');
    }
}