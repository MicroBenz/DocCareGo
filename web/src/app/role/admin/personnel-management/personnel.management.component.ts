import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PERSONNEL_MANAGEMENT_TITLE } from '../../../config/title.config';

@Component({
    selector: 'personnel-management',
    templateUrl: './personnel.management.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class PersonnelManagementComponent implements OnInit {
    public personnelList;
    constructor (private title: Title) {}
    ngOnInit () {
        this.title.setTitle(PERSONNEL_MANAGEMENT_TITLE);
        this.personnelList = [
            {
                id: 555,
                name: 'ธนนันท์',
                surname: 'ตั้งธนาชัยกุล',
                role: 'patient'
            }
        ]
        console.log(this.personnelList);
    }
}