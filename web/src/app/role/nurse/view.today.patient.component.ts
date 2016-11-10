import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VIEW_TODAY_PATIENT_TITLE } from '../../config/title.config';

@Component({
    selector: 'view-today-patient',
    templateUrl: './view.today.patient.view.html',
    styleUrls: ['view.today.patient.style.css']
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