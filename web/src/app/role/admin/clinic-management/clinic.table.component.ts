import { Component, Input, OnInit } from '@angular/core';
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
    @Input('clinics') clinics;
    public currentClinic;
    public showConfirmDelete: boolean;
    ngOnInit () {
        this.clinics = [
            {
                name: 'ทางเดินอาหารและตับ'
            },
            {
                name: 'ศัลยกรรม'
            }
        ]
        this.currentClinic = '';
        this.showConfirmDelete = false;
    }

    editClinicInfo (name) {
        // TODO: Navigate to Edit Page
    }

    deleteClinicInfo (name) {
        return () => {
            console.log('INSIDE FUNCTION ', name);            
        }
    }

    onDeleteSucceed (val) {
        console.log('on succeed ', val);
        this.showConfirmDelete = false;
    }
}