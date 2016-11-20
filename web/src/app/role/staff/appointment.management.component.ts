import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MANAGE_APPOINTMENT_TITLE } from './../../config/title.config';
import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../config/api.config';
import * as moment from 'moment';
import { SearchBoxComponent } from '../../shared/component/searchbox.component';

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
export class AppointmentManagementComponent implements OnInit, AfterViewInit {
    @ViewChild(SearchBoxComponent) private searchBoxComponent: SearchBoxComponent;

    public appointmentList: Array<Object>;
    public isShowConfirmDeleteModal: boolean;
    public cancelAppointmentModal: string;
    public selectedApptId: string;
    public selectedApptIndex;

    constructor(private title: Title, private dataService: DataService) {}
    
    ngOnInit () {
        this.appointmentList = [];
        this.isShowConfirmDeleteModal = false;
        this.cancelAppointmentModal = `<h1 class="title">คุณต้องการยกเลิกการนัดหมายใช่หรือไม่?</h1>`;
        this.selectedApptId = '';
        this.selectedApptIndex = -1;
        this.title.setTitle(MANAGE_APPOINTMENT_TITLE);
        // this.dataService.getData(APPOINTMENT_ENDPOINT)
        //     .map(
        //         (appointments) => {
        //             return appointments.map(
        //                 (appointment) => {
        //                     appointment['workday']['date'] = moment(appointment['workday']['date']).format('LL');
        //                     appointment['workday']['time'] = appointment['workday']['time'] === 'AM'? '9:00 - 11:30': '13:00 - 15:30';
        //                     return appointment;
        //                 }
        //             )
        //         }
        //     )
        //     .subscribe(
        //         (appointments) => {
        //             console.log(appointments);
        //             this.appointmentList = appointments;
        //         }
        //     )        
    }

    ngAfterViewInit () {
        this.searchBoxComponent.searchKeyControl.setValue('');
    }
    
    public getAppointmentsData = (key) => {
        return this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            user: key
        })
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
            // .subscribe(
            //     (appointments) => {
            //         console.log(appointments);
            //         this.appointmentList = appointments;
            //     }
            // )  
    }

    public onSearchResult (appointments) {
        console.log('SEARCH RES: ',appointments);
        this.appointmentList = appointments;
    }
    postponeAppointment (id) {
        // TODO: Navigate to postpone appointment
        console.log('[AppointmentManagementComponent] postpone id = ', id);
    }

    cancelAppointment = (id, index) => {
        // TODO: Handle Cancel Appointment
        console.log('[AppointmentManagementComponent] cancel id = ', id);
        this.selectedApptId = id;
        this.selectedApptIndex = index;
        this.isShowConfirmDeleteModal = true;        
    }

    deleteAppointmentDataService = () => {
        console.log('DATA SERVICE =====> ', this.selectedApptId);
        this.dataService.deleteData(`${APPOINTMENT_ENDPOINT}/${this.selectedApptId}`)
            .subscribe(
                (success) => {
                    console.log('DELETE SUCCESS ', success);
                    this.isShowConfirmDeleteModal = false;
                    this.appointmentList.splice(this.selectedApptIndex, 1);
                }
            )
    }

    printoutAppointment (id) {
        // TODO: Handle Printout Appointment
        console.log('[AppointmentManagementComponent] printout id = ', id);        
    }
}