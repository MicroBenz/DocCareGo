import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        .panel-block.month-selection a {
            cursor: pointer;
        }
        .panel-block.month-selection a.is-disabled {
            color: gray;
        }
        .panel-block.month-selection .month-text {
            display: inline-block;
            margin-left: 10px;
            margin-right: 10px;       
            width: 120px;     
        }
        .workday-wrapper {
            max-height: 500px;
            overflow: scroll;
        }
    `]
})
export class WorkdaySelectorComponent implements OnInit {
    @Output('onSelectWorkday') onSelectWorkday = new EventEmitter();
    public workdayList;
    public currentMonth: number;
    public currentYear: number;
    public currentMonthDisplay: string;
    public isDiabledPreviousSelection: boolean;

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.currentMonth = moment().month();
        this.currentMonthDisplay = this.getMonthText(this.currentMonth);
        this.currentYear = moment().year();
        this.isDiabledPreviousSelection = true;
        this.getDataService();
    }

    private getDataService () {
        let workdayParams = {
            month: this.currentMonth,
            year: this.currentYear
        }
        this.dataService.getDataWithParams(`${WORKDAY_ENDPOINT}/${this.authService.getUserID()}`, workdayParams)
            .map(this.filterDate)
            .map(this.sortDate)
            .map(this.filterBeforeToday)
            .map(this.dateTransform)            
            .map(this.deleteDuplicateDate)
            .subscribe(
                (dayList) => {
                    this.workdayList = dayList;
                }
            )
    }

    public clickNextMonth () {
        this.currentMonth += 1;
        if (this.currentMonth === 12) {
            this.currentYear += 1;
            this.currentMonth = 0;
        }
        this.currentMonthDisplay = this.getMonthText(this.currentMonth);
        this.isDiabledPreviousSelection = false;
        this.getDataService();
    }

    public clickPreviousMonth () {
        this.currentMonth -= 1;
        if (this.currentMonth === -1) {
            this.currentYear -= 1;
            this.currentMonth = 11;
        }
        if (this.currentMonth === moment().month() && this.currentYear === moment().year()) {
            this.isDiabledPreviousSelection = true;
        }
        this.currentMonthDisplay = this.getMonthText(this.currentMonth);
        this.getDataService();            
    }

    private getMonthText (month) {
        return moment().set('month', month).format('MMMM');
    }

    public selectWorkday (day) {
        let splittedDate = day.split(' ');
        let date = moment().set('date', splittedDate[0]).set('month', splittedDate[1]).set('year', splittedDate[2]);
        this.onSelectWorkday.emit(date);
    }

    // Workday Decorator
    private filterDate = (response: Array<Object>) => {
        return response.map(
            (item) => {
                return item['date'];
            }
        )
    }

    private sortDate = (dayList: Array<any>) => {
        return dayList.sort();        
    }

    private filterBeforeToday = (dayList: Array<any>) => {
        return dayList.filter(
            (date) => {
                return moment().isBefore(date);
            }
        )
    }
    
    private dateTransform = (dayList: Array<any>) => {
        return dayList.map(
            (date) => {
                return moment(date).format('LL');
            }
        )
    }

    private deleteDuplicateDate = (dayList: Array<any>) => {
        let arr = [];
        for (let i = 0 ; i < dayList.length ; i += 1) {
            if (arr.indexOf(dayList[i]) === -1) {
                arr.push(dayList[i]);                
            }
        }
        return arr;
    }
}