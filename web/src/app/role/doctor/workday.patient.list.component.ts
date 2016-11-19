import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';
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
        .tabs.is-boxed {
            margin-bottom: 0px;
        }
        .patient-list {
            border: 1px solid rgb(219, 219, 219);
            border-top: none;
            padding: 10px;
            height: 380px;
            overflow: scroll;
        }
    `]
})
export class WorkdayPatientListComponent implements OnInit, OnChanges {
    @Input('workdayItem') workdayItem;
    public selectedPeriod: number;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.selectedPeriod = 0;
    }

    ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
        let workdayItem = changes['workdayItem']['currentValue'];
        if (workdayItem !== '') {
            console.log(workdayItem);
            let workdayId = '';            
            if (this.selectedPeriod === 0) {
                if (workdayItem['period'][0]['slot'] === 'AM') {
                    workdayId = workdayItem['period'][0]['id'];
                }
                else {
                    workdayId = workdayItem['period'][1]['id'];
                }
            }
            else {
                if (workdayItem['period'][0]['slot'] === 'PM') {
                    workdayId = workdayItem['period'][0]['id'];
                }
                else {
                    workdayId = workdayItem['period'][1]['id'];
                }
            }
            this.getDataByWorkdayID(workdayId)
        }
    }

    private getDataByWorkdayID (id) {
        console.log(id);
        this.dataService.getDataWithParams(APPOINTMENT_ENDPOINT, {
            workday: id
        })
        .subscribe(
            (success) => {
                console.log('SUCCESS GET WORKDAY: ', success);
            }
        )
    }
}