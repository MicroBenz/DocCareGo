import { Component, OnInit } from '@angular/core';
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
    `]
})
export class DiseasesSelectorComponent implements OnInit {
    public diseasesList: Array<Object>;

    ngOnInit () {
        this.diseasesList = [];
    }

    addNewDiseases() {
        this.diseasesList.push(1);
    }

    removeDisease(index) {
        this.diseasesList.splice(index, 1);
    }
}