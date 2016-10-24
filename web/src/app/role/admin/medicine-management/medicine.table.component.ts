import { Component, Input } from '@angular/core';

@Component({
    selector: 'medicine-table',
    templateUrl: './medicine.table.view.html',
    styles: [`
        .table .action-column {
            width: 24%;
        }

        .table tbody tr td .fa {
            padding-right: 5px;
        }
    `]
})
export class MedicineTableComponent {
    @Input('medicineList') medicineList = [];

}