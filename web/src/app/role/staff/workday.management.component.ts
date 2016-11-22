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
        .doctor-hn-box i.fa-check-circle {
            color: green;
        }
        .doctor-information .is-info h2 {
            display: inline-block;
        }
        .doctor-information .is-info i.fa {
            font-size: 25px;
            cursor: pointer;
        }
        .option-wrapper {
            text-align: center;
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
    public chosenFunction: string;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.doctorHN = '';
        this.doctorName = '';
        this.selectedDoctor = {};
        this.isSearchCompleted = false;
        this.hasDoctorWithThatHN = false;
        this.isConfirmDoctor = false;
        this.chosenFunction = '';
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