import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MANAGE_APPOINTMENT_TITLE } from './../../config/title.config';

@Component({
    selector: 'appointment-management',
    templateUrl: './appointment.management.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .box {
            margin-top: 15px;
            margin-bottom: 15px;
        }
    `]
})
export class AppointmentManagementComponent implements OnInit {
    constructor(private title: Title) {}
    
    public appointmentList;

    ngOnInit () {
        this.appointmentList = [
            {
                id: 1,
                patient: 'นายธนนันท์ ตั้งธนาชัยกุล',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 2,
                patient: 'นายณัฐนัย จารย์อิ้ง',
                doctor: 'นายแพทย์ธนนันท์ ตั้งธนาชัยกุล',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 3,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 4,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 5,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 6,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 7,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 8,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            },
            {
                id: 9,
                patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
                doctor: 'นายแพทย์ธีรัช รักษ์เถา',
                clinic: 'ทางเดินอาหารและตับ',
                date: '13/10/2559',
                time: '13:00 - 13:30'
            }
        ]
        this.title.setTitle(MANAGE_APPOINTMENT_TITLE);
    }
    
    postponeAppointment (id) {
        // TODO: Navigate to postpone appointment
        console.log('[AppointmentManagementComponent] postpone id = ', id);
    }

    cancelAppointment (id) {
        // TODO: Handle Cancel Appointment
        console.log('[AppointmentManagementComponent] cancel id = ', id);
    }

    printoutAppointment (id) {
        // TODO: Handle Printout Appointment
        console.log('[AppointmentManagementComponent] printout id = ', id);        
    }
}