import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { MAKE_APPOINTMENT_TITLE } from '../../../config/title.config';
import { DataService } from '../../service/data.service';
import { AuthService } from '../../service/auth.service'
import { WORKDAY_ENDPOINT, APPOINTMENT_ENDPOINT } from '../../../config/api.config'

@Component({
    selector: 'make-appointment-form',
    templateUrl: './make.appointment.form.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .box {
            margin-bottom: 25px;           
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
export class MakeAppointmentFormComponent implements OnInit {
    // public clinicList;
    // public doctorList;
    // public selectedClinicIndex;
    // public selectedDoctorIndex;
    public selectedClinic;
    public selectedDoctor;
    public selectedTimeSlot;
    public causeToAppointment: string;
    public isConfirmedAppointmentDetail: boolean;
    public isConfirmedTimeSlot: boolean;
    public allTimeSlot;
    @Output('onConfirmAppointment') onConfirmAppointment = new EventEmitter();
    @Input('isMakeAppointmentSuccess') isMakeAppointmentSuccess = false;

    constructor(private router: Router, private title: Title, private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.title.setTitle(MAKE_APPOINTMENT_TITLE);
        // this.clinicList = [];
        // this.doctorList = [];  
        // this.selectedDoctorIndex = '-1';
        // this.selectedClinicIndex = '-1';
        // this.selectedClinic = {};
        // this.selectedDoctor = {};   
        this.selectedTimeSlot = {};
        // this.causeToAppointment = ''; 
        this.isConfirmedAppointmentDetail = false;
        this.isConfirmedTimeSlot = false;
        // this.isAppointmentSuccess = false;
        this.allTimeSlot = []; 
        // this.dataService.getData(CLINIC_ENDPOINT)
        //     .subscribe(
        //         (success) => {
        //             this.clinicList = success;
        //         }
        //     )
    }

    // onSelectClinic(index) {
    //     this.selectedDoctorIndex = '-1';
    //     this.selectedDoctor = {};
    //     this.selectedClinic = this.clinicList[Number(index)];
    //     this.dataService.getDataWithParams(DOCTOR_ENDPOINT, {
    //         clinic: this.clinicList[Number(index)]['_id']
    //     })
    //     .subscribe(
    //         (success) => {
    //             console.log(success);
    //             this.doctorList = success;
    //         }
    //     )
    // }

    // onSelectDoctor(index) {
    //     this.selectedDoctor = this.doctorList[Number(index)];        
    // }

    // confirmAppointmentDetail () {
    //     this.isConfirmedAppointmentDetail = true;
    //     // this.requestAvailableTime();
    // }

    public onConfirmAppointmentDetail (data) {
        console.log('ON CONFIRM', data);
        this.isConfirmedAppointmentDetail = true;
        this.selectedClinic = data.clinic;
        this.selectedDoctor = data.doctor;
        this.causeToAppointment = data.causeToAppointment;
        this.requestAvailableTime(data);
    }

    private requestAvailableTime (item) {
        let requestOption = {};
        if (Object.getOwnPropertyNames(item.doctor).length === 0) {
            requestOption['clinic'] = item.clinic['_id'];
        }
        else {
            requestOption['doctor'] = item.doctor['_id'];            
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
        this.onConfirmAppointment.emit(formData);
    }

    navigateToViewAppointment () {
        this.router.navigateByUrl('/patient/view-appointment');
    }
}