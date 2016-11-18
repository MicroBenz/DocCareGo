import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
import { CLINIC_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'clinic-table',
    templateUrl: './clinic.table.view.html',
    styles: [`
        .table .action-column {
            width: 26%;
        }

        .table tbody tr td .fa {
            padding-right: 5px;
        }
    `]
})
export class ClinicTableComponent implements OnInit {
    @Input('clinicList') clinicList = [];
    public selectedIndex: number;
    public selectedDeleteName : string;
    public isShowConfirmDelete: boolean;
    public deleteDialog: string; 

    constructor(private router: Router, private dataService: DataService) {}
    
    ngOnInit () {
        this.deleteDialog = '';
        this.isShowConfirmDelete = false;
        this.selectedIndex = -1;
    }

    editClinicInfo (name) {
        this.router.navigate(['/admin/clinic-management/edit-clinic', name]);
    }

    deleteClinicItem (name, idx) {
        this.selectedDeleteName = name;
        this.deleteDialog = `<h1 class="title">ต้องการลบแผนก<b>${this.selectedDeleteName}</b> หรือไม่?</h1>`;    
        this.isShowConfirmDelete = true;
        this.selectedIndex = idx;
    }

    deleteClinic = () => {
        this.dataService.deleteData(`${CLINIC_ENDPOINT}/${this.selectedDeleteName}`)
            .subscribe(
                (success) => {
                    console.log('DELETE SUCCESS');
                    this.clinicList.splice(this.selectedIndex, 1);
                    this.dismissModal();
                }
            )
    }

    dismissModal = () => {
        this.isShowConfirmDelete = false;
    }

}