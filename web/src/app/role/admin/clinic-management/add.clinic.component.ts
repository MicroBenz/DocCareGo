import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// import { ADD_CLINIC_TITLE } from '../../../config/title.config';
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
    public confirmModalContent: string;

    constructor (private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.clinicData = {
            name: '',
            description: ''
        }
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';
    }

    validateForm () {
        if(this.clinicData === undefined || this.clinicData === null) {
            this.isShowInvalidate = true; 
        }
        else if (this.clinicData['name'] === '' || this.clinicData['description'] === '') {
            this.isShowInvalidate = true;
        }
        else {
            this.isShowConfirm = true;
            this.decorateModalContent();
        }
    }

    private decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำเพิ่มแผนก</h1>
            <p><b>ชื่อแผนก:</b> ${this.clinicData['name']}</p>
            <p><b>รายละเอียดแผนกs:</b> ${this.clinicData['description']}</p>
            `;
    }

    addClinic = () => {
        this.dataService.saveData(CLINIC_ENDPOINT, this.clinicData)
            .subscribe(
                (success) => {
                    console.log('ADD NEW CLINIC');
                    this.navigateToClinicManagement();
                }
            )
    }

     navigateToClinicManagement = () => {
        this.router.navigateByUrl('/admin/clinic-management');
    }

    dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }

}
