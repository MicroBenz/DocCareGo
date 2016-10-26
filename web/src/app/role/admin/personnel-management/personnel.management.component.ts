import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PERSONNEL_MANAGEMENT_TITLE } from '../../../config/title.config';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TestService } from '../../../shared/service/test.service';

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
    `]
})
export class PersonnelManagementComponent implements OnInit {
    public personnelList;
    constructor (private title: Title, private http: Http, private testService: TestService) {}

    ngOnInit () {
        this.title.setTitle(PERSONNEL_MANAGEMENT_TITLE);
        this.personnelList = [];
    }

    searchFunction () {
        return (key) => {
            return this.testService.getSearchByKey(key);
        }
    }

    onSearchResult (searchResult) {
        this.personnelList = searchResult.result.personnel;
    }
}