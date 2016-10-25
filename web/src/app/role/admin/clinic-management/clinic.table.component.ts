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

    ngOnInit () {
        this.clinics = [
            {
                name: 'ทางเดินอาหารและตับ'
            },
            {
                name: 'มะเร็งทางเดินอาหาร'
            }
        ]
    }

    editClinicInfo (name) {

    }

    deleteClinicInfo (name) {
    
    }
}