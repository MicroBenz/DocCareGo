import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MEDICINE_MANAGEMENT_TITLE } from '../../../config/title.config';
import { MedicineService } from '../../../shared/service/medicine.service';

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
    constructor(private title: Title, private medicineService: MedicineService) {}

    ngOnInit () {
        this.medicineList = [];
        this.title.setTitle(MEDICINE_MANAGEMENT_TITLE);
        this.medicineService.getMedicine()
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
        return (key) => {
            return this.medicineService.searchMedicine(key);
        }
    }

    
}