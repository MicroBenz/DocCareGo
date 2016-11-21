import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataService } from '../../../shared/service/data.service';
import { DISEASES_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'diseases-selector',
    templateUrl: './diseases.selector.view.html',
    styles: [`
        .first-col {
            width: 28px;
        }
        .disease-name-col {
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
            cursor: pointer;
            margin-bottom: 5px;
            margin-right: 5px;
        }
        .table tbody tr td {
            vertical-align: middle !important;
        }
    `]
})
export class DiseasesSelectorComponent implements OnInit {
    @Input('diseasesList') diseasesList: Array<Object> = [];
    public disease = new FormControl();
    public diseasesSuggestion;

    constructor(private dataService: DataService) {}

    ngOnInit () {
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
        this.disease.setValue('');
        this.diseasesSuggestion = [];
    }

    removeDisease(index) {
        this.diseasesList.splice(index, 1);
    }
}