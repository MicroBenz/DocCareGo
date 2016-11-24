import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service/data.service';
import { PATIENT_ENDPOINT, APPOINTMENT_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'staff-make-appointment',
    templateUrl: './make.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .appointment-button {
            margin-top: 15px;
        }
        .hn-box {
            margin-bottom: 20px;
        }
        .patient-information .is-info h2{
            display: inline-block;
        }
        .patient-information .is-info i.fa {
            font-size: 25px;
        }
    `]
})
export class MakeAppointmentByStaffComponent implements OnInit {
    public isConfirmHN: boolean;
    public isSearchPatientCompleted: boolean;
    public isMakeAppointmentSuccess: boolean;
    public hasPatientWithThatHN: boolean;
    public patientHN: string;
    public patientName: string;
    public selectedPatient;

    constructor(private dataService: DataService) {}
    ngOnInit () {
        this.patientHN = '';
        this.patientName = '';
        this.selectedPatient = {};
        this.isConfirmHN = false;
        this.isMakeAppointmentSuccess = false;
        this.isSearchPatientCompleted = false;
        this.hasPatientWithThatHN = false;
    }

    searchPatient () {
        this.dataService.getData(`${PATIENT_ENDPOINT}/${this.patientHN}`)
            .subscribe(
                (patient) => {
                    this.isSearchPatientCompleted = true;
                    this.hasPatientWithThatHN = true;                    
                    this.patientName = `${patient.preName}${patient.name} ${patient.surname}`;
                    this.selectedPatient = patient;
                },
                (error) => {
                    this.isSearchPatientCompleted = true; 
                    this.hasPatientWithThatHN = false;                   
                }
            )
    }

    confirmThisPatient () {
        this.isConfirmHN = true;
    }

    onConfirmAppointment (formData) {
        formData['patient'] = this.selectedPatient.HN;
        this.dataService.saveData(APPOINTMENT_ENDPOINT, formData)
            .subscribe(
                (success) => {
                    this.isMakeAppointmentSuccess = true;                    
                }
            )        
    }
}