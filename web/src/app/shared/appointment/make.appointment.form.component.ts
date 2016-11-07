import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Clinic } from './clinic.component';

const CLINICS: Clinic[] = [
    {id:1 ,name: "คลินิกทางเดินอาหาร"},
    {id:2 ,name: "คลินิกหัวใจ"},
    {id:3 ,name: "คลินิกทางผ่าน"}
];

@Component({
    selector: 'make-appointment-form',
    templateUrl: './make.appointment.form.view.html',
    styles: [`
        .appointment-choice-wrapper {
            text-align: center;
        }
    `]
})
export class MakeAppointmentFormComponent {
    public isFirstSelect: boolean = true;
    public appointmentChoice;
    public appointmentData;

    public timeTable = [
        {
            date: 'วันที่ 18 สิงหาคม 2559',
            time: [
                '13:00 - 13:30',
                '13:30 - 14:00',
                '14:00 - 14:30',
                '14:30 - 15:00',
                '15:00 - 15:30',
                '15:30 - 16:00',
                '16:00 - 16:30',
                '16:30 - 17:00',
                '17:00 - 17:30',
                '17:30 - 18:00',
                '18:00 - 18:30'
            ]
        },
        {
            date: 'วันที่ 19 สิงหาคม 2559',
            time: [
                '13:00 - 13:30',
                '13:30 - 14:00',
                '14:00 - 14:30',
                '14:30 - 15:00'
            ]
        },
        {
            date: 'วันที่ 20 สิงหาคม 2559',
            time: [
                '13:30 - 14:00'
            ]
        }
    ];

    public doctorTimeTable = [
        {
            doctor: 'นายแพทย์ธีรัช รักษ์เถา',
            timeTable : [
                {
                    date: 'วันที่ 15 สิงหาคม 2559',
                    time: [
                        '13:00 - 13:30',
                        '13:30 - 14:00',
                        '14:00 - 14:30',
                        '14:30 - 15:00',
                        '15:00 - 15:30',
                        '15:30 - 16:00',
                        '16:00 - 16:30',
                        '16:30 - 17:00',
                        '17:00 - 17:30',
                        '17:30 - 18:00',
                        '18:00 - 18:30'
                    ]
                },
                {
                    date: 'วันที่ 16 สิงหาคม 2559',
                    time: [
                        '13:00 - 13:30',
                        '13:30 - 14:00',
                        '14:00 - 14:30',
                        '14:30 - 15:00'
                    ]
                },
            ]
        },
        {
            doctor: 'นายแพทย์ธนวัฒน์ เค้าฉลองเคียง',
            timeTable : [
                {
                    date: 'วันที่ 22 สิงหาคม 2559',
                    time: [
                        '13:00 - 13:30',
                        '13:30 - 14:00',
                        '14:30 - 15:00',
                        '15:00 - 15:30',
                    ]
                },
                {
                    date: 'วันที่ 23 สิงหาคม 2559',
                    time: [
                        '14:30 - 15:00'
                    ]
                },
            ]
        }
    ]

    private isNoSelection = [];
    constructor(private router: Router) {
        this.appointmentData = {}
        for (let i = 0 ; i < this.doctorTimeTable.length ; i++) {
            this.isNoSelection.push(true);
        }
    }

    //Sax Edit 
    clinics = CLINICS;
    // selectClinic: Clinic;
    selectClinic: Clinic = new Clinic(0,'none');
    // public onSelect(selectClinic) {
    //     this.selectClinic = selectClinic;
    // }
    onSelect(clinic: Clinic): void {
        this.selectClinic = clinic;
    }


    onSelectTime(time , i) {
        this.setClearSelection(i);
        console.log('[MakeAppointmentComponent -> time obtain from child component] ', time);
        this.appointmentData['date'] = time.date;
        this.appointmentData['time'] = time.time;
        if (time.doctor) {
            this.appointmentData['doctor'] = time.doctor;
        }
        console.log('[MakeAppointmentComponent -> appointmentData]', this.appointmentData);        
    }

    private setClearSelection (idx) {
        // Idx will pass latest selection index
        for (let i = 0 ; i < this.isNoSelection.length ; i++) {
            if (i !== idx) {
                this.isNoSelection[i] = true;
            }
            else {
                this.isNoSelection[i] = false;
            }
        }
        console.log(this.isNoSelection);
    }

}