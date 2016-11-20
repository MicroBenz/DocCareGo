import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../../config/api.config';
import { AuthService } from '../../../shared/service/auth.service';
@Component({
    selector: 'start-working',
    templateUrl: './start.working.view.html'
})
export class StartWorkingComponent implements OnInit {

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            doctor: this.authService.getUserID()
        })
        .subscribe(
            (patients) => {
                console.log(patients);
            }
        )
    }
}