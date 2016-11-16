import { Component, Input } from '@angular/core';
import * as moment from 'moment';

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
export class WorkdayPatientListComponent {
    @Input('date') date;

    public displayDate(date) {
        return moment(date).format('LL');
    }
}