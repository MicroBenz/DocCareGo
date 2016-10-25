import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CLINIC_MANAGEMENT_TITLE } from '../../../config/title.config';

@Component({
    selector: 'clinic-management',
    templateUrl: './clinic.management.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .search-box-wrapper {
            display: inline-block;
            width: 69%;
            margin-right: 10px;
        }
        .add-button-wrapper {
            display: inline-block;
        }
        .add-button-wrapper .fa {
            padding-right: 5px;
        }
    `]
})
export class ClinicManagementComponent implements OnInit {
    constructor(private title: Title) {}
    ngOnInit () {
        this.title.setTitle(CLINIC_MANAGEMENT_TITLE);
    }
}