import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../../config/api.config';
import { AuthService } from '../../../shared/service/auth.service';
@Component({
    selector: 'start-working',
    templateUrl: './start.working.view.html',
    styles: [`
        .container-fluid {
            margin-top: 13px;
        }
    `]
})
export class StartWorkingComponent implements OnInit {
    public patientList: Array<Object>;
    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.patientList = [];
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            doctor: this.authService.getUserID()
        })
        .subscribe(
            (patients: Array<Object>) => {
                this.patientList = patients;
                console.log(patients);
            }
        )
    }
}