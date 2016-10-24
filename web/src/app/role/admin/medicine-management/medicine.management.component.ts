import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MEDICINE_MANAGEMENT_TITLE } from '../../../config/title.config';

@Component({
    selector: 'medicine-management',
    templateUrl: './medicine.management.view.html',
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
export class MedicineManagementComponent implements OnInit {
    constructor(private title: Title) {}
    ngOnInit () {
        this.title.setTitle(MEDICINE_MANAGEMENT_TITLE);
    }
}