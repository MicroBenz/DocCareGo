import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../service/data.service';
import { DOCTOR_ENDPOINT, CLINIC_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'appointment-request-form',
    templateUrl: './appointment.request.form.view.html',
    styles: [`
        .appointment-form  .columns .column .select{
            width: 100%;
        }
        .appointment-form  .columns .column .select select{
            width: 100%;
        }
    `]
})
export class AppointmentRequestFormComponent implements OnInit {
    public selectedDoctorIndex;
    public selectedDoctor;
    public selectedClinicIndex;
    public selectedClinic;
    public clinicList;
    public doctorList;
    public causeToAppointment: string;
    @Output('onConfirmAppointmentDetail') onConfirmAppointmentDetail = new EventEmitter();

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.clinicList = [];
        this.doctorList = [];  
        this.selectedDoctorIndex = '-1';
        this.selectedClinicIndex = '-1';
        this.causeToAppointment = ''; 
        this.dataService.getData(CLINIC_ENDPOINT)
            .subscribe(
                (clinics) => {
                    this.clinicList = clinics;
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
                this.doctorList = success;
            }
        )
    }

    onSelectDoctor(index) {
        this.selectedDoctor = this.doctorList[Number(index)];        
    }

    confirmAppointmentDetail () {
        // this.isConfirmedAppointmentDetail = true;
        this.onConfirmAppointmentDetail.emit({
            doctor: this.selectedDoctor,
            clinic: this.selectedClinic,
            causeToAppointment: this.causeToAppointment
        });
        // this.requestAvailableTime();
    }
}