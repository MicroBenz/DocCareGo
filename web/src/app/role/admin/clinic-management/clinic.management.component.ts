import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DataService } from '../../../shared/service/data.service';
import { CLINIC_MANAGEMENT_TITLE } from '../../../config/title.config';
import { CLINIC_ENDPOINT } from '../../../config/api.config';

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
    public clinicList;
    constructor(private title: Title, private dataService: DataService, private router: Router) {}

    ngOnInit () {
        this.clinicList = [];
        this.title.setTitle(CLINIC_MANAGEMENT_TITLE);
        this.dataService.getData(CLINIC_ENDPOINT)
            .subscribe(this.displayClinics, this.errorHandler);
    }

    public displayClinics = (clinics) => {
        this.clinicList = clinics;
    }

    private errorHandler = (error) => {
        console.error('MedicineManagementError: ', error);
    }

    public searchFunction () {
        return (searchKey) => {
            return this.dataService.searchData(CLINIC_ENDPOINT, searchKey);
        }
    }

    navigateToAddClinic () {
        this.router.navigateByUrl('/admin/clinic-management/add-clinic');
    }
}