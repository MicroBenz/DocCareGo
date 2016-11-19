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
        .workday-wrapper .panel-block.is-active {
            background-color: #4ca2ff;
            color: #ffffff;
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
    public selectedDate;

    constructor(private dataService: DataService, private authService: AuthService) {}

    ngOnInit () {
        this.currentMonth = moment().month();
        this.currentMonthDisplay = this.getMonthText(this.currentMonth);
        this.currentYear = moment().year();
        this.isDiabledPreviousSelection = true;
        this.selectedDate = '';
        this.getDataService();
    }

    private getDataService () {
        let workdayParams = {
            month: this.currentMonth,
            year: this.currentYear
        }
        this.dataService.getDataWithParams(`${WORKDAY_ENDPOINT}/${this.authService.getUserID()}`, workdayParams)
            .map(this.sortByDate)
            .map(this.filterBeforeToday)
            .map(this.setDisplayDate)
            // .map(this.groupByDate)
            .subscribe(
                (dayList) => {
                    console.log(dayList);
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

    public selectWorkday (idx) {
        // let splittedDate = day.split(' ');
        // let date = moment().set('date', splittedDate[0]).set('month', splittedDate[1]).set('year', splittedDate[2]);
        // this.selectedDate = day;
        this.selectedDate = this.workdayList[idx]['displayDate'];
        this.onSelectWorkday.emit(this.workdayList[idx]);
    }

    // NEW Workday Decorator
    private sortByDate = (response: Array<Object>) => {
        return response.sort(
            (firstItem: Object, secondItem: Object) => {
                if (moment(firstItem['date']).isSame(moment(secondItem['date']), 'day')) {
                    console.log('SAME DAY');                    
                    if (firstItem['time'] === 'AM') {
                        return -1;
                    }
                    return 1;
                }
                else if (moment(firstItem['date']).isBefore(moment(secondItem['date']))) {
                    return -1;
                }
                else {
                    return 1;                    
                }
            }
        );
    }

    private filterBeforeToday = (dayList: Array<Object>) => {
        return dayList.filter(
            (date) => {
                return moment().isBefore(date['date']);
            }
        )
    }

    private setDisplayDate = (dayList: Array<Object>) => {
        console.log(dayList);
        return dayList.map(
            (day) => {
                let period = day['time'] === 'AM'? '(เช้า)': '(บ่าย)';
                let dateFormatted = moment(day['date']).format('LL');
                day['displayDate'] = `${dateFormatted} ${period}`;
                return day;
            }
        )
    }
    private groupByDate = (dayList: Array<Object>) => {
        let decoratedList = {};
        for (let i = 0 ; i < dayList.length ; i += 1) {
            let currentDate = dayList[i]['date'];
            if (decoratedList[currentDate] === undefined || decoratedList[currentDate] === null) {
                decoratedList[currentDate] = [dayList[i]];
            }
            else {
                decoratedList[currentDate].push(dayList[i]);
            }
        }
        return Object.keys(decoratedList).map(
            (day) => {
                let workdaysOnThatDay = decoratedList[day];
                let workdayObject = {
                    date: workdaysOnThatDay[0]['date'],
                    displayDate: moment(workdaysOnThatDay[0]['date']).format('LL'),
                    period: []
                };
                for (let i = 0 ; i < workdaysOnThatDay.length ; i++) {
                    workdayObject.period.push({
                        id: workdaysOnThatDay[i]['_id'],
                        slot: workdaysOnThatDay[i]['time']
                    })
                }
                return workdayObject;
            }
        );
    }
}