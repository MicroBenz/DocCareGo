import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATIENT_ENDPOINT, DOCTOR_ENDPOINT, NURSE_ENDPOINT, PHARMACIST_ENDPOINT, STAFF_ENDPOINT } from '../../../config/api.config';
import { DataService } from '../../../shared/service/data.service';

@Component({
    selector: 'personnel-table',
    templateUrl: './personnel.table.view.html',
    styles: [`
        .table .id-column {
            width: 13%;
        }
        .table .action-column {
            width: 24%;
        }

        .table tbody tr td .fa {
            padding-right: 5px;
        }
        :host /deep/ .title {
            word-break: normal;
        }
    `]
})
export class PersonnelTableComponent implements OnInit{
    @Input('personnelList') personnelList: Array<any>;
    @Input('role') role;

    public isShowConfirmDelete: boolean;
    public deleteDialog: string;
    private toDeleteIndex: number;
    private roleMapping;

    constructor(private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.isShowConfirmDelete = false;
        this.roleMapping = {
            patient: 'ผู้ป่วย',
            nurse: 'พยาบาล',
            doctor: 'แพทย์',
            pharmacist: 'เภสัชกร',
            staff: 'เจ้าหน้าที่'
        }
        this.toDeleteIndex = -1;
    }

    public editInfo (hn) {
        let editRoute = `/admin/personnel-management/edit-${this.role}/${hn}`;
        this.router.navigateByUrl(editRoute);
    }

    public deleteItem (index) {
        this.deleteDialog = `
            <h1 class="title">ต้องการลบ<b>${this.personnelList[index].name} ${this.personnelList[index].surname} [${this.roleMapping[this.role]}]</b> ออกจากระบบหรือไม่?</h1>
        `;
        this.isShowConfirmDelete = true;
        this.toDeleteIndex = index;
    }

    public deleteDataService = () => {
        let endpoint = '';
        switch (this.role) {
            case 'patient':
                endpoint = PATIENT_ENDPOINT;
                break;
            case 'doctor':
                endpoint = DOCTOR_ENDPOINT;
                break;
            case 'nurse':
                endpoint = NURSE_ENDPOINT;
                break;
            case 'pharmacist':
                endpoint = PHARMACIST_ENDPOINT;
                break;
            case 'staff':
                endpoint = STAFF_ENDPOINT;
                break;
        }
        this.dataService.deleteData(`${endpoint}/${this.personnelList[this.toDeleteIndex].HN}`)
            .subscribe(
                (success) => {
                    this.personnelList.splice(this.toDeleteIndex, 1);
                    this.dismissModal();
                }
            )
    }

    public dismissModal = () => {
        this.isShowConfirmDelete = false;
        this.toDeleteIndex = -1;
    }
}