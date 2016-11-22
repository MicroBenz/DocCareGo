import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { VIEW_APPOINTMENT_TITLE } from './../../config/title.config';
import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../config/api.config';
import { AuthService } from '../../shared/service/auth.service';

@Component({
    selector: 'view-appointment',
    templateUrl: './view.appointment.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .mini-calendar {
            margin-bottom: 20px;
        }
        .appointment-detail p {
            margin-bottom: 10px;
        }
        .appointment-detail-description {
            line-height: 24px;   
        }
    `]
})
export class ViewAppointmentComponent implements OnInit {
    public appointments;
    private selectedAppointment;
    
    constructor(private title: Title, private dataService: DataService, private authService: AuthService) {}
    
    ngOnInit () {
        this.appointments = [];
        this.selectedAppointment = {
            clinic: '',
            doctor: '',
            date: '',
            time: ''
        };
        this.title.setTitle(VIEW_APPOINTMENT_TITLE);        
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            user: this.authService.getUserHN()
        })
        .map(
            (success: Array<Object>) => {
                console.log(success);
                return success.sort(
                    (firstItem, secondItem) => {
                        let firstDate = firstItem['workday']['date'];
                        let secondDate = secondItem['workday']['date'];
                        if (moment(firstDate).isBefore(secondDate)) {
                            return -1;
                        }
                        return 1;
                    }
                )
            }
        )
        .subscribe(
            (success: Array<Object>) => {
                console.log('GET APPOINTMENT');
                console.log(success);
                this.appointments = success.map(
                    (item) => {
                        let doctorName = `${item['doctor']['preName']}${item['doctor']['name']} ${item['doctor']['surname']}`;
                        let date = moment(item['workday']['date']).format('D/M/YYYY');
                        return {
                            'date': date,
                            'time': item['workday']['time'] === 'AM'? '9:00 - 11:30': '13:00 - 15:30',
                            'clinic': item['doctor']['clinic']['name'],
                            'doctor': doctorName
                        }
                    }
                )
                if (this.appointments.length !== 0) {
                    this.selectedAppointment = this.appointments[0];
                }
            }
        )
    }

    public onSelectRow(selectedAppointment) {
        this.selectedAppointment = selectedAppointment;
    }
}