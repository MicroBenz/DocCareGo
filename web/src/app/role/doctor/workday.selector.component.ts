import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { DataService } from '../../shared/service/data.service';
import { AuthService } from '../../shared/service/auth.service';
import { WORKDAY_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'workday-selector',
    templateUrl: './workday.selector.view.html',
    styles: [`
        .panel-block.month-selection {
            text-align: center;
        }
        .panel-block.month-selection .month-text {
            display: inline;
            margin-left: 10px;
            margin-right: 10px;            
        }
    `]
})
export class WorkdaySelectorComponent implements OnInit {
    public workdayList;
    public thisMonth;

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.thisMonth = moment().format('MMMM YYYY');
        this.dataService.getData(`${WORKDAY_ENDPOINT}/${this.authService.getUserID()}`)
            .subscribe(
                (success: Array<any>) => {
                    this.workdayList = success.slice(0, 32);
                    console.log(this.dateTransform());
                }
            )
    }

    dateTransform () {
        console.log(moment(this.workdayList[0]['date']).format('LLL'));
    }
}