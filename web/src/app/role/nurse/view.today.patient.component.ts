import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../shared/service/data.service';
import { VIEW_TODAY_PATIENT_TITLE } from '../../config/title.config';
import { PATIENT_RECORD_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'view-today-patient',
    templateUrl: './view.today.patient.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .columns {
            box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
            border-radius: 5px;
            height: 550px;
        }
        .box {
            box-shadow: none;
            height: 100%;
        }
        .patient-list-wrapper {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px; 
            border-right: 1px solid #c8c7cc;  
            padding-bottom: 0px;   
            padding-right: 0px;                  
        }
        .patient-list-wrapper .patient-list-header, .patient-recorder-wrapper .patient-recorder-header {
            margin-left: -20px;
            margin-top: -20px;
            margin-right: -20px;
            padding: 20px;       
            background-color: #00bfff;            
        }
        .patient-list-wrapper .patient-list-header {
            border-top-left-radius: 5px;
        }
        .patient-recorder-wrapper .patient-recorder-header {
            border-top-right-radius: 5px;
        }
        .patient-list-content {
            height: 490px;
            overflow-y: scroll;
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
        }
        .patient-recorder-wrapper {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;            
        }
        .patient-recorder-content {
            height: 490px;
            padding-top: 15px;
        }
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
        }
    `]
})
export class ViewTodayPatientComponent implements OnInit {
    public patientRecordList;
    private selectedPatient;

    constructor (private title: Title, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(VIEW_TODAY_PATIENT_TITLE);
        this.patientRecordList = [];
        this.dataService.getData(PATIENT_RECORD_ENDPOINT)
            .map(
                (appointments) => {
                    console.log(appointments);
                    return appointments.map(
                        (appointment) => {
                            let name = `${appointment['patient']['preName']}${appointment['patient']['name']} ${appointment['patient']['surname']}`;
                            let doctor = `${appointment['doctor']['preName']}${appointment['doctor']['name']} ${appointment['doctor']['surname']}`
                            return {
                                id: appointment['_id'],
                                hn: appointment['patient']['HN'],
                                name: name,
                                clinic: appointment['doctor']['clinic']['name'],
                                doctor: doctor
                            }
                        }
                    )
                }
            )
            .subscribe(this.displayPatientRecords, this.errorHandler);
        this.selectedPatient = {};
        
    }

    public displayPatientRecords = (patientRecords) => {
        console.log(patientRecords);
        this.patientRecordList = patientRecords;
    }

    private errorHandler = (error) => {
        console.error('ViewTodayPatientComponentError: ', error);
    }

    onSelectPatient(idx) {
        this.selectedPatient = this.patientRecordList[idx];
    }
}