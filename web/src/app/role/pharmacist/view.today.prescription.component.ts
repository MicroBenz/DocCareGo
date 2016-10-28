import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VIEW_PATIENT_PRESCRIPTION } from './../../config/title.config';

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
            //overflow-y: scroll;
            //max-height: 550px;
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
export class ViewTodayPrescriptionComponent {
    constructor(private title: Title) {
        title.setTitle(VIEW_PATIENT_PRESCRIPTION);
    }
    public patientList = [
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
    
    public prescription = [
        {
            name: 'พาราเซตตามอล',
            quantity: '3 เม็ด'
        },
        {
            name: 'พาราเซตตามอล',
            quantity: '1 เม็ด'
        },
        {
            name: 'ยาน้ำตราโป๊ยเซียน 200ml',
            quantity: '1 ขวด'
        }
    ]
    private selectedPatient = {};

    onSelectPatient(idx) {
        this.selectedPatient = this.patientList[idx];
    }
}