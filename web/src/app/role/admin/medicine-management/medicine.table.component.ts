import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(private router: Router) {}

    editInfo (name) {
        this.router.navigate(['/admin/medicine-management/edit-medicine', name]);
    }

    deleteItem (name) {

    }
}