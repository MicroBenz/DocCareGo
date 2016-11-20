import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_ENDPOINT, DISEASES_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'diseases-selector',
    templateUrl: './diseases.selector.view.html',
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
        .diseases-tag {

        }
    `]
})
export class DiseasesSelectorComponent implements OnInit {
    public diseasesList: Array<Object>;
    public disease = new FormControl();
    public diseasesSuggestion;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.diseasesList = [];
        this.diseasesSuggestion = [];
        this.disease.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .flatMap(
                (searchKey) => {
                    if (searchKey === '') {
                        console.log('EMPTY SEARCH KEY');
                        this.diseasesSuggestion = [];
                        return [];
                    }
                    return this.dataService.searchData(DISEASES_ENDPOINT, searchKey)
                }
            )
            .subscribe(
                (diseases) => {
                    this.diseasesSuggestion = diseases;
                    console.log(diseases);
                }
            )
    }

    addNewDiseases(index) {
        let selectedDiseases = this.diseasesSuggestion[index];
        console.log(selectedDiseases);
        for (let i = 0 ; i < this.diseasesList.length ; i += 1) {
            if (selectedDiseases['_id'] === this.diseasesList[i]['_id']) {
                console.log('EXIST');
                return;
            }
        }
        this.diseasesList.push(selectedDiseases);
    }

    removeDisease(index) {
        this.diseasesList.splice(index, 1);
    }
}