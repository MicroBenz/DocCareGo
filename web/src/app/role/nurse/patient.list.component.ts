import { Component } from '@angular/core';
@Component({
    selector: 'patient-list',
    templateUrl: './patient.list.view.html',
    styles: [`
        .active {
            background-color: whitesmoke;
        }
        .patient-item {
            border-top: 1px solid #c8c7cc;
            border-bottom: 1px solid #c8c7cc;
            margin-left: -20px;
            margin-right: -20px;
            padding: 12px 20px 12px 20px;
        }
        .patient-item .time-circle {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 24px;
            color: #ffffff;
            background-color: #000000;
            line-height: 45px;
            text-align: center;
        }
        .patient-info {
            padding-left: 0px;
            padding-right: 0px;
        }
        .patient-info .patient-name {
            font-size: 19px;
        }
        .patient-info .patient-clinic {
            font-weight: 200;
        }
    `]
})
export class PatientListComponent {
    private selectedIndex = -1;
    public patientList = [
        {
            id: 1,
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '13:00 - 13:30'
        },
        {
            id: 2,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 3,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 3,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 4,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 5,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 6,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 7,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        },
        {
            id: 8,            
            hn: '000022',
            name: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/1/2559',
            time: '12:00 - 12:30'
        }
    ]

    onSelectPatient (idx) {
        this.selectedIndex = idx;
        console.log(this.patientList[idx]);
    }
}