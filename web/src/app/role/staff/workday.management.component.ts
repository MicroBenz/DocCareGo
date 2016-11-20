import { Component, OnInit } from '@angular/core';

import { DataService } from '../../shared/service/data.service';
import { DOCTOR_ENDPOINT } from '../../config/api.config';
@Component({
    selector: 'workday-management-staff',
    templateUrl: './workday.management.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .doctor-information .is-info h1 {
            display: inline-block;
        }
    `]
})
export class WorkdayManagementByStaffComponent implements OnInit {
    public doctorHN: string;
    public doctorName: string;
    public selectedDoctor;
    public isSearchCompleted: boolean;
    public hasDoctorWithThatHN: boolean;
    public isConfirmDoctor: boolean;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.doctorHN = '';
        this.doctorName = '';
        this.selectedDoctor = {};
        this.isSearchCompleted = false;
        this.hasDoctorWithThatHN = false;
        this.isConfirmDoctor = false;
    }

    searchDoctor () {
        this.isSearchCompleted = false;
        this.dataService.getData(`${DOCTOR_ENDPOINT}/${this.doctorHN}`)
            .subscribe(
                (doctor) => {
                    console.log('GET DOCTOR');
                    console.log(doctor);
                    this.isSearchCompleted = true;  
                    this.hasDoctorWithThatHN = true;                  
                    this.doctorName = `${doctor.preName}${doctor.name} ${doctor.surname}`;
                    this.selectedDoctor = doctor;
                },
                (error) => {
                    this.isSearchCompleted = true; 
                    this.hasDoctorWithThatHN = false;                    
                }
            )
    }

    confirmThisDoctor () {
        this.isConfirmDoctor = true;
    }
}