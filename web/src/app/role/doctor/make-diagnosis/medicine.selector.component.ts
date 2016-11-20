import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_ENDPOINT } from '../../../config/api.config';
@Component({
    selector: 'medicine-selector',
    templateUrl: './medicine.selector.view.html',
    styles: [`
        .first-col {
            width: 28px;
        }
        .medicine-name-col {
            width: 300px;
        }
        .action-button {
            font-size: 32px;
            cursor: pointer;
        }
        .add-button {
            color: green;
        }
        .remove-button {
            color: red;
        }
        .medicine-tag {
            cursor: pointer;
            margin-bottom: 5px;
            margin-right: 5px;
        }
        .table tbody tr td {
            vertical-align: middle !important;
        }
    `]
})
export class MedicineSelectorComponent implements OnInit {
    public medicineList: Array<Object>;
    public medicineSuggestion;
    public medicine = new FormControl();

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.medicineList = [];
        this.medicineSuggestion = [];
        this.medicine.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .flatMap(
                (searchKey) => {
                    if (searchKey === '') {
                        console.log('EMPTY SEARCH KEY');
                        this.medicineSuggestion = [];
                        return [];
                    }
                    return this.dataService.searchData(MEDICINE_ENDPOINT, searchKey)
                }
            )
            .subscribe(
                (medicines) => {
                    this.medicineSuggestion = medicines;
                    console.log(medicines);
                }
            )
    }

    addNewMedicine (index) {
        let selectedMedicine = this.medicineSuggestion[index];
        for (let i = 0 ; i < this.medicineList.length ; i += 1) {
            if (selectedMedicine['_id'] === this.medicineList[i]['_id']) {
                return;
            }
        }
        this.medicineList.push(selectedMedicine);
        this.medicine.setValue('');
        this.medicineSuggestion = [];
    }

    removeMedicine (index) {
        this.medicineList.splice(index, 1);
    }
}
