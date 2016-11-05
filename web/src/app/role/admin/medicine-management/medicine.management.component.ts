import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_MANAGEMENT_TITLE } from '../../../config/title.config';
import { MEDICINE_ENDPOINT } from '../../../config/api.config';

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
    public medicineList;
    constructor(private title: Title, private dataService: DataService) {}

    ngOnInit () {
        this.medicineList = [];
        this.title.setTitle(MEDICINE_MANAGEMENT_TITLE);
        this.dataService.getData(MEDICINE_ENDPOINT)
            .subscribe(this.displayMedicines, this.errorHandler);            
    }

    public displayMedicines = (medicines) => {
        console.log(medicines);
        this.medicineList = medicines;
    }

    private errorHandler = (error) => {
        console.error('MedicineManagementError: ', error);
    }

    public searchFunction () {
        return (searchKey) => {
            return this.dataService.searchData(MEDICINE_ENDPOINT, searchKey);
        }
    }

    
}