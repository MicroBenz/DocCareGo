import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../shared/service/data.service';
import { VIEW_PATIENT_PRESCRIPTION } from './../../config/title.config';
import { DIAGNOSIS_RESULT_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'view-today-prescription',
    templateUrl: './view.today.prescription.view.html',
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
            /*//overflow-y: scroll;*/
            /*//max-height: 550px;*/
        }
        .patient-list-wrapper {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px; 
            border-right: 1px solid #c8c7cc;  
            padding-bottom: 0px;       
            padding-right: 0px;              
        }
        .patient-list-wrapper .patient-list-header, .patient-prescription-wrapper .patient-prescription-header {
            margin-left: -20px;
            margin-top: -20px;
            margin-right: -20px;
            padding: 20px;       
            background-color: #00bfff;            
        }
        .patient-list-wrapper .patient-list-header {
            border-top-left-radius: 5px;
        }
        .patient-prescription-wrapper .patient-prescription-header {
            border-top-right-radius: 5px;
            margin-right: -21px !important;
        }
        .patient-list-content {
            height: 490px;
            overflow-y: scroll;
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
        }
        .patient-prescription-wrapper {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;            
        }
        .patient-prescription-content {
            height: 490px;
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 15px;
            overflow-y: scroll;
        }
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
        }
        .level {
            margin-bottom: 0px;
        }
    `]
})
export class ViewTodayPrescriptionComponent implements OnInit {
    public patientList;
    public prescriptionList;
    public prescriptionHistoryList;
    public medicineAllegyList;
    public amountOfPrescription;
    public amountOfPrescriptionHistory;
    public isShowConfirm: boolean;
    private selectedPatient;
    private prescriptionHistoryItem;
    private prescriptionHistoryIndex: number;


    constructor(private title: Title, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(VIEW_PATIENT_PRESCRIPTION);
        this.patientList = [];
        this.prescriptionList = [];
        this.prescriptionHistoryList = [];
        this.medicineAllegyList = [];
        this.amountOfPrescription = [];
        this.amountOfPrescriptionHistory = [];
        this.isShowConfirm = false;

        
        this.dataService.getData(DIAGNOSIS_RESULT_ENDPOINT)
            .map(
                (diagnosis_results) => {
                    return diagnosis_results.map(
                        (diagnosis_results) => {
                            let name = `${diagnosis_results['appointment']['patient']['preName']}${diagnosis_results['appointment']['patient']['name']} ${diagnosis_results['appointment']['patient']['surname']}`;
                            let doctor = `${diagnosis_results['appointment']['doctor']['preName']}${diagnosis_results['appointment']['doctor']['name']} ${diagnosis_results['appointment']['doctor']['surname']}`;
                            return {
                                id: diagnosis_results['_id'],
                                hn: diagnosis_results['appointment']['patient']['HN'],
                                name: name,
                                patient: diagnosis_results['appointment']['patient'],
                                doctor: doctor,
                                clinic: diagnosis_results['appointment']['doctor']['clinic']['name'],
                                noMedicines: diagnosis_results['appointment']['patient']['noMedicines'],
                                date: diagnosis_results['appointment']['workday']['date'],
                                // time: diagnosis_results['appointment']['workday']['time'],
                                medicines: diagnosis_results['medicines'],
                                numberOfMedicines: diagnosis_results['numberOfMedicines']
                            }
                        }
                    )
                }
            )
            .subscribe(this.displayPatientPrescriptions, this.errorHandler);
        this.selectedPatient = {};
        this.prescriptionHistoryItem = [];
    }   

    public displayPatientPrescriptions = (patientPrescriptions) => {
        this.patientList = patientPrescriptions;
    }

    public displayPatientPrescriptionHistory = (patientPrescriptionHistory) => {
        this.prescriptionHistoryList = patientPrescriptionHistory;
        this.prescriptionHistoryIndex = this.prescriptionHistoryList.length-1;
        this.prescriptionHistoryItem = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['prescriptionHistory'];
        this.amountOfPrescriptionHistory = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['numberOfMedicines'];
    }

    private errorHandler = (error) => {
        console.error('ViewTodayPrescriptionComponentError');
    }

    public getPreviousPrescriptionHistory() {
        if(this.prescriptionHistoryIndex-1 > -1)
            this.prescriptionHistoryIndex -= 1;
        this.prescriptionHistoryItem = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['prescriptionHistory'];
        this.amountOfPrescriptionHistory = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['numberOfMedicines'];
    }

    public getNextPrescriptionHistory() {
        if(this.prescriptionHistoryIndex+1 < this.prescriptionHistoryList.length)
            this.prescriptionHistoryIndex += 1;
        this.prescriptionHistoryItem = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['prescriptionHistory'];
        this.amountOfPrescriptionHistory = this.prescriptionHistoryList[this.prescriptionHistoryIndex]['numberOfMedicines'];
    }

    public getPatientPrescriptionHistory(patient) {
        this.dataService.getDataWithParams(DIAGNOSIS_RESULT_ENDPOINT, {patient: patient['id']})
            .map(
                (diagosis_history) => {
                    return diagosis_history.map(
                        (diagosis_history) => {
                            let name = `${diagosis_history['appointment']['patient']['preName']}${diagosis_history['appointment']['patient']['name']} ${diagosis_history['appointment']['patient']['surname']}`;
                            return {
                                id: diagosis_history['_id'],
                                hn: diagosis_history['appointment']['patient']['HN'],
                                name: name,
                                date: diagosis_history['appointment']['workday']['date'],
                                prescriptionHistory: diagosis_history['medicines'],
                                numberOfMedicines: diagosis_history['numberOfMedicines']
                            }
                        }
                    )
                }
            )
            .subscribe(this.displayPatientPrescriptionHistory, this.errorHandler);
    }

    public getPatientPrescriptionData(selectedPatient) {
        this.prescriptionList = selectedPatient['medicines'];
        this.amountOfPrescription = selectedPatient['numberOfMedicines'];
        this.medicineAllegyList = selectedPatient['noMedicines'];
        this.getPatientPrescriptionHistory(selectedPatient['patient']);
    }

    onSelectPatient(idx) {
        this.selectedPatient = this.patientList[idx];
        this.getPatientPrescriptionData(this.selectedPatient);
    }

    confirmPrescription() {
        this.isShowConfirm = true;
    }

    dismissModal = () => {
        this.isShowConfirm = false;
    }
}