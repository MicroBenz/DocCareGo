import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PERSONNEL_MANAGEMENT_TITLE } from '../../../config/title.config';
import { DataService } from '../../../shared/service/data.service';
import { PATIENT_ENDPOINT, DOCTOR_ENDPOINT, NURSE_ENDPOINT, STAFF_ENDPOINT, PHARMACIST_ENDPOINT } from '../../../config/api.config';
import { SearchBoxComponent } from '../../../shared/component/searchbox.component';

@Component({
    selector: 'personnel-management',
    templateUrl: './personnel.management.view.html',
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
        .tabs ul li a {
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        }
    `]
})
export class PersonnelManagementComponent implements OnInit {
    @ViewChild(SearchBoxComponent)
    private searchBoxComponent: SearchBoxComponent;

    public personnelList;
    public selectedRole;
    constructor (private title: Title, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(PERSONNEL_MANAGEMENT_TITLE);
        this.switchRole('patient');
    }

    switchRole (role) {
        this.personnelList = [];
        this.selectedRole = role;
        this.searchBoxComponent.searchKeyControl.setValue('');
    }

    searchFunction (role) {
        let searchEndpoint = '';
        switch(role) {
            case 'patient':
                searchEndpoint = PATIENT_ENDPOINT;
                break;
            case 'doctor':
                searchEndpoint = DOCTOR_ENDPOINT;
                break;
            case 'nurse':
                searchEndpoint = NURSE_ENDPOINT;
                break;
            case 'staff':
                searchEndpoint = STAFF_ENDPOINT;
                break;
            case 'pharmacist':
                searchEndpoint = PHARMACIST_ENDPOINT;
        }
        return (key) => {
            return this.dataService.searchData(searchEndpoint, key);
        }
    }

    onSearchResult (searchResult) {
        this.personnelList = searchResult;
    }
}