import { Component, Input } from '@angular/core';

@Component({
    selector: 'mini-calendar',
    template: `
        <div class="calendar">
            <h1 class="month">{{getMonth()}}</h1>
            <h4 class="date">{{getDate()}}</h4>
        </div>   
    `,
    styles: [`
        .calendar {
            width: 150px;
            height: 150px;
            text-align: center;
            border: 2px solid #c7c7c7;
            border-radius: 25px;   
            margin: auto;         
        }
        .month {
            color: #ff1f4b;
            font-size: 25px;
            padding-top: 10px;
        }
        .date {
            font-size: 87px;
            line-height: 87px;
            font-weight: 200;
        }
    `]
})
export class MiniCalendarComponent {
    @Input('date') date = '19/11/2016';

    private monthMapping = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    private getDate () {
        return this.date.split('/')[0];
    }

    private getMonth () {
        let monthIdx: number = Number(this.date.split('/')[1]);
        return this.monthMapping[monthIdx - 1];
    }
}