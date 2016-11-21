import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { DataService } from '../../shared/service/data.service';
import { APPOINTMENT_ENDPOINT, WORKDAY_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'workday-patient-list',
    templateUrl: './workday.patient.list.view.html',
    styles: [`
        .notification.is-danger {
            line-height: 27px;
        }
        .notification.is-danger .fa {
            font-size: 27px;
            margin-left: 5px;
            cursor: pointer;
        }
        .title {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .hn-column {
            width: 20%;
        }
        .header {
            display: flex;
            flex-direction: row;
            flex-grow: 2;
        }
        .header .title {
            flex: 1;
        }
        .header .button {
            align-items: flex-end;
            height: 38px;
            line-height: 38px;
        }
        .header .button .icon {
            line-height: 12px;
        }
    `]
})
export class WorkdayPatientListComponent implements OnInit, OnChanges {
    @Input('workdayItem') workdayItem;
    public isFirstLoad: boolean;
    public isShowConfirmDelete: boolean;
    public deleteId;
    public patientList;
    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.patientList = [];
        this.isFirstLoad = true;
        this.isShowConfirmDelete = false;
        this.deleteId = '';
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

    cancelWorkday(id) {
        console.log(id);
        this.deleteId = id;
        this.isShowConfirmDelete = true;
    }

    cancelWorkdayDataService () {
        this.dataService.deleteData(`${WORKDAY_ENDPOINT}/${this.deleteId}`)
            .subscribe(
                (success) => {
                    console.log(success);
                    this.dismissNoti();
                }
            )
    }

    dismissNoti () {
        this.isShowConfirmDelete = false;
    }
}