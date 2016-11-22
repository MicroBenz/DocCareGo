import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_ENDPOINT } from '../../../config/api.config';

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
export class MedicineTableComponent implements OnInit {
    @Input('medicineList') medicineList = [];

    public isShowConfirmDelete: boolean;
    public deleteDialog: string;    
    public selectedDelete;
    public selectedIndex: number;

    constructor(private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.isShowConfirmDelete = false;
        this.deleteDialog = '';
        this.selectedIndex = -1;
    }

    editInfo (name) {
        this.router.navigate(['/admin/medicine-management/edit-medicine', name]);
    }

    deleteItem (name, idx) {
        this.selectedDelete = name;
        this.deleteDialog = `<h1 class="title">ต้องการลบยา<b>${this.selectedDelete}</b> หรือไม่?</h1>`;     
        this.isShowConfirmDelete = true;
        this.selectedIndex = idx;
    }

    dismissModal = () => {
        this.isShowConfirmDelete = false;
    }

    deleteMedicine = () => {
        this.dataService.deleteData(`${MEDICINE_ENDPOINT}/${this.selectedDelete}`)
            .subscribe(
                (success) => {
                    console.log('DELETE SUCCEED');
                    this.medicineList.splice(this.selectedIndex, 1);
                    this.dismissModal();
                }
            )
    }
}