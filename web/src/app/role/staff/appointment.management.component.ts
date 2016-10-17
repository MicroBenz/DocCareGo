import { Component } from '@angular/core';

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
export class AppointmentManagementComponent {
    private appointmentList = [
        {
            patient: 'นายธนนันท์ ตั้งธนาชัยกุล',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายณัฐนัย จารย์อิ้ง',
            doctor: 'นายแพทย์ธนนันท์ ตั้งธนาชัยกุล',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        },
        {
            patient: 'นายธนวัฒน์ เค้าฉลองเคียง',
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            clinic: 'ทางเดินอาหารและตับ',
            date: '13/10/2559',
            time: '13:00 - 13:30'
        }
    ]

    postponeAppointment (id) {
        // TODO: Navigate to postpone appointment

    }

    cancelAppointment (id) {
        // TODO: Handle Cancel Appointment

    }

    printoutAppointment (id) {
        // TODO: Handle Printout Appointment

    }
}