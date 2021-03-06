import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ADD_CLINIC_TITLE } from '../../../config/title.config';
import { CLINIC_ENDPOINT } from '../../../config/api.config';
import { DataService } from '../../../shared/service/data.service';

@Component({
    selector: 'add-clinic',
    templateUrl: './add.clinic.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})

export class AddClinicComponent implements OnInit {
    public clinicData;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowSuccess: boolean;
    public confirmModalContent: string;

    constructor (private title: Title, private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(ADD_CLINIC_TITLE);
        this.clinicData = {
            name: '',
            description: ''
        }
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.isShowSuccess = false;
        this.confirmModalContent = '';
    }

    private validateForm () {
        if(this.clinicData === undefined || this.clinicData === null) {
            return false;
        }
        if (this.clinicData['name'] === undefined || this.clinicData['name'] === null || this.clinicData['name'] === '') {
            return false;
        }
        if (this.clinicData['description'] === undefined || this.clinicData['description'] === null || this.clinicData['description'] === '') {
            return false;
        }
        else {
            return true;
        }
    }

    addNewClinic () {
        if(this.validateForm()) {
            this.decorateModalContent();
            this.isShowConfirm = true;
        }
        else {
            this.isShowInvalidate = true;
        }
    }

    decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำเพิ่มแผนก</h1>
            <p><b>ชื่อแผนก:</b> ${this.clinicData['name']}</p>
            <p><b>รายละเอียดแผนก:</b> ${this.clinicData['description']}</p>
            `;
    }

    addClinicDataService = () => {
        this.dataService.saveData(CLINIC_ENDPOINT, this.clinicData)
            .subscribe(
                (success) => {
                    this.isShowSuccess = true;
                },
                (error) => {
                    console.error(error);
                }
            )
    }

     navigateToClinicManagement = () => {
        this.router.navigateByUrl(`/admin/clinic-management`);
    }

    dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.isShowSuccess = false;
    }

}
