import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MANAGE_WORKDAY_TITLE } from '../../config/title.config';

@Component({
    selector: 'manage-doctor-workday',
    templateUrl: './manage.workday.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class ManageWorkdayComponent implements OnInit {
    public selectedWorkday;

    constructor (private title: Title) {}

    ngOnInit () {
        this.title.setTitle(MANAGE_WORKDAY_TITLE);
        this.selectedWorkday = '';
    }

    public onSelectWorkday (date) {
        this.selectedWorkday = date;
    }
}