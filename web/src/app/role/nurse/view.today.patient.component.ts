import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VIEW_TODAY_PATIENT_TITLE } from '../../config/title.config';

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
            //overflow-y: scroll;
            //max-height: 550px;
        }
        .patient-list-wrapper {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px; 
            border-right: 1px solid #c8c7cc;  
            padding-bottom: 0px;                     
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
            margin-right: -35px;
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
    public patientList;
    private selectedPatient;

    constructor (private title: Title) {}

    ngOnInit () {
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
        ]
        this.selectedPatient = {};
        this.title.setTitle(VIEW_TODAY_PATIENT_TITLE);
    }
    onSelectPatient(idx) {
        this.selectedPatient = this.patientList[idx];
    }
}