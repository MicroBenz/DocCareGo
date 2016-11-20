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
    // public medicines;
    private selectedPatient;
    private prescriptionHistoryIndex: number;

    constructor(private title: Title, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(VIEW_PATIENT_PRESCRIPTION);
        this.patientList = [];
        this.prescriptionList = [];
        this.prescriptionHistoryList = [];
        this.medicineAllegyList = [];
        
        // this.dataService.getData(DIAGNOSIS_RESULT_ENDPOINT)
            // .subscribe(this.displayPatientPrescriptions, this.errorHandler);
        this.patientList = [
           {
               id: 1,
               appointment: {
                   description: '',
                   patient: {
                       HN: '000022',
                       preName: 'นาย',
                       name: 'ธนนันท์',
                       surname: 'ตั้งธนาชัยกุล',
                       noMedicines: [
                           'one','two'
                       ]
                   },
                   doctor: {
                       preName: 'นายแพทย์',
                       name: 'ธีรัช ',
                       surname: 'รักษ์เถา',
                       clinic: {
                           name: 'ทางเดินอาหารและตับ'
                       }
                   },
                   workday: {
                       date: '13/1/2559',
                       time: '10:00 - 10:30'
                   }
               },
               medicines: [
                    {
                        name: 'พาราเซตตามอล',
                        quantity: '3 เม็ด',
                        howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
                    }
                ] 
           },
           {
               id: 2,            
               appointment: {
                   description: '',
                   patient: {
                       HN: '103022',
                       preName: 'นางสาว',
                       name: 'วิภวานี',
                       surname: 'วัชระเดชสกุล',
                       noMedicines: [
                           'one','two','three'
                       ]
                   },
                   doctor: {
                       preName: 'นายแพทย์',
                       name: 'ธีรัช ',
                       surname: 'รักษ์เถา',
                       clinic: {
                           name: 'ทางเดินอาหารและตับ'
                       }
                   },
                   workday: {
                       date: '13/1/2559',
                       time: '11:00 - 11:30'
                   }
               },
               medicines: [
                    {
                        name: 'พาราเซตตามอล',
                        quantity: '3 เม็ด',
                        howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
                    },
                    {
                        name: 'พาราเซตตามอล',
                        quantity: '3 เม็ด',
                        howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
                    }
                ]
           },
           {
               id: 3,            
               appointment: {
                   description: '',
                   patient: {
                       HN: '204052',
                       preName: 'นาย',
                       name: 'ธีรัช',
                       surname: 'รักษ์เถา',
                       noMedicines: []
                   },
                   doctor: {
                       preName: 'นายแพทย์',
                       name: 'ณัษฐพงษ์',
                       surname: 'อู่สิริมณีชัย',
                       clinic: {
                           name: 'ทางเดินอาหารและตับ'
                       }
                   },
                   workday: {
                       date: '13/1/2559',
                       time: '11:30 - 12:00'
                   }
               },
               medicines: [
                    {
                        name: 'พาราเซตตามอล',
                        quantity: '3 เม็ด',
                        howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
                    },
                    {
                        name: 'null',
                        quantity: '3 เม็ด',
                        howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
                    }
                ]
           } 
        ]; 
        this.prescriptionHistoryList = [
            [{
                name: 'พาราเซตตามอล',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
            }],
            [{
                name: 'abc',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
            },
            {
                name: 'ddna',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
            }]
        ];
        // this.medicineAllegyList = [
        //     {
        //         name: 'abc',
        //         quantity: '3 เม็ด',
        //         howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
        //     },
        //     {
        //         name: 'ddna',
        //         quantity: '3 เม็ด',
        //         howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
        //     }
        // ];
        this.selectedPatient = {};
        this.prescriptionHistoryIndex = this.prescriptionHistoryList.length-1;
    }   

    public displayPatientPrescriptions = (patientPrescriptions) => {
        console.log(patientPrescriptions);
        this.patientList = patientPrescriptions;
        // this.prescriptionList = patientPrescriptions['medicines'];
    }

    private errorHandler = (error) => {
        console.error('ViewTodayPrescriptionComponentError');
    }

    public getPreviousPrescriptionHistory() {
        if(this.prescriptionHistoryIndex-1 > -1)
            this.prescriptionHistoryIndex -= 1;
    }

    public getNextPrescriptionHistory() {
        if(this.prescriptionHistoryIndex+1 < this.prescriptionHistoryList.length)
            this.prescriptionHistoryIndex += 1;
    }

    public getPatientPrescriptionHistory(patient) {
        this.dataService.getDataWithParams(DIAGNOSIS_RESULT_ENDPOINT, {patient: patient})
            .subscribe(this.displayPatientPrescriptions, this.errorHandler);
    }

    public displayPatientPrescriptionHistory = (patientPrescription) => {
        console.log(patientPrescription);
        this.prescriptionHistoryList = patientPrescription;
    }

    public getPatientPrescriptionData(selectedPatient) {
        // get Today precription
        this.prescriptionList = selectedPatient['medicines'];
        // get no medicines
        let appointment = selectedPatient['appointment'];
        let patient = appointment['patient'];
        this.medicineAllegyList = patient['noMedicines'];
        // get History prescription
        // this.getPatientPrescriptionHistory(patient);
        
    }

    onSelectPatient(idx) {
        this.selectedPatient = this.patientList[idx];
        this.getPatientPrescriptionData(this.selectedPatient);
    }
}