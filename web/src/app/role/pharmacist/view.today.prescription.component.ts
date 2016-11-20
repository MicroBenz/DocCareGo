import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../shared/service/data.service';
import { VIEW_PATIENT_PRESCRIPTION } from './../../config/title.config';
import { DIAGNOSIS_RESULT_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'view-today-prescription',
    templateUrl: './view.today.prescription.view.html',
    styleUrls: ['view.today.prescription.style.css']
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
               hn: '000022',
               name: 'นายธนนันท์ ตั้งธนาชัยกุล',
               doctor: 'นายแพทย์ธีรัช รักษ์เถา',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '10:00 - 10:30'
           },
           {
               id: 2,            
               hn: '103022',
               name: 'นางสาววิภวานี วัชระเดชสกุล',
               doctor: 'นายแพทย์ธีรัช รักษ์เถา',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '11:00 - 11:30'
           },
           {
               id: 3,            
               hn: '204052',
               name: 'นายธีรัช รักษ์เถา',
               doctor: 'นายแพทย์ณัษฐพงษ์ อู่สิริมณีชัย',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '11:30 - 12:00'
           },
           {
               id: 4,            
               hn: '123456',
               name: 'นายณัษฐพงษ์ อู่สิริมณีชัย',
               doctor: 'นายแพทย์ธีรัช รักษ์เถา',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '12:00 - 12:30'
           },
           {
               id: 5,            
               hn: '654321',
               name: 'นางสาววันทนีย์ ทองทั่ว',
               doctor: 'นายแพทย์ณัษฐพงษ์ อู่สิริมณีชัย',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '13:00 - 13:30'
           },
           {
               id: 6,            
               hn: '785912',
               name: 'นายธนวัฒน์ เค้าฉลองเคียง',
               doctor: 'นายแพทย์ณัษฐพงษ์ อู่สิริมณีชัย',
               clinic: 'ทางเดินอาหารและตับ',
               date: '13/1/2559',
               time: '16:30 - 17:30'
           }
        ]; 
        this.prescriptionList = [
            {
                name: 'พาราเซตตามอล',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
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
        this.medicineAllegyList = [
            {
                name: 'abc',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
            },
            {
                name: 'ddna',
                quantity: '3 เม็ด',
                howto: 'รับประทานหลังอาหารเช้า/กลางวัน/เย็น ครั้งละ 1 เม็ด'
            }
        ];
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

    public getPatientPrescriptionHistory() {
        this.dataService.getData(DIAGNOSIS_RESULT_ENDPOINT)
            .subscribe(this.displayPatientPrescriptions, this.errorHandler);
    }

    public displayPatientPrescriptionHistory = (patientPrescription) => {
        console.log(patientPrescription);
        this.prescriptionHistoryList = patientPrescription;
    }

    public getPatientPrescriptionData(selectedPatient) {
        // get Today precription
        // this.prescriptionList = selectedPatient['medicines'];
        // get History prescription
        // this.getPatientPrescriptionHistory();
        // this.prescriptionLastHistory = this.prescriptionHistoryList[0];
        // get no medicines
        let appointment = selectedPatient['appointment'];
        // let patient = appointment['patient'];
        // this.medicineAllegyList = patient['noMedicines'];
    }

    onSelectPatient(idx) {
        this.selectedPatient = this.patientList[idx];
        this.getPatientPrescriptionData(this.selectedPatient);
    }
}