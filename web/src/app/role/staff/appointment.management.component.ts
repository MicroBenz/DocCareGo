import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MANAGE_APPOINTMENT_TITLE } from './../../config/title.config';
import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../config/api.config';
import * as moment from 'moment';

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
    public appointmentList;
    
    constructor(private title: Title, private dataService: DataService) {}
    
    ngOnInit () {
        this.appointmentList = [];
        this.title.setTitle(MANAGE_APPOINTMENT_TITLE);
        this.dataService.getData(APPOINTMENT_ENDPOINT)
            .map(
                (appointments) => {
                    return appointments.map(
                        (appointment) => {
                            appointment['workday']['date'] = moment(appointment['workday']['date']).format('LL');
                            appointment['workday']['time'] = appointment['workday']['time'] === 'AM'? '9:00 - 11:30': '13:00 - 15:30';
                            return appointment;
                        }
                    )
                }
            )
            .subscribe(
                (appointments) => {
                    console.log(appointments);
                    this.appointmentList = appointments;
                }
            )        
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