import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'workday-patient-list',
    templateUrl: './workday.patient.list.view.html',
    styles: [`
        .title {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .hn-column {
            width: 20%;
        }
    `]
})
export class WorkdayPatientListComponent implements OnInit, OnChanges {
    @Input('workdayItem') workdayItem;
    public isFirstLoad: boolean;
    public patientList;
    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.patientList = [];
        this.isFirstLoad = true;
    }

    ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
        let workdayItem = changes['workdayItem']['currentValue'];
        if (workdayItem !== '') {
            this.isFirstLoad = false;
            this.getDataByWorkdayID(workdayItem['_id']);
        }
    }

    private getDataByWorkdayID (id) {
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            workday: id
        })
        .map(
            (success: Array<Object>) => {
                return success.map(
                    (item) => {
                        return item['patient'];
                    }
                )
            }
        )
        .subscribe(
            (success) => {
                this.patientList = success;
            }
        )
    }
}