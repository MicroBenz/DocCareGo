import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
import { CLINIC_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'edit-clinic',
    templateUrl: './edit.clinic.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})

export class EditClinicComponent implements OnInit {
    public clinicData;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public confirmModalContent: string;

    constructor (private route: ActivatedRoute, private router: Router, private dataService: DataService) {}
    
    ngOnInit () {
        this.clinicData = {
            name: '',
            description: ''
        }
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';

        let clinicName = this.route.snapshot.params['clinicName'];
        this.dataService.getData(CLINIC_ENDPOINT + '/' + clinicName)
            .subscribe(
                (clinic) => {
                    this.clinicData['name'] = clinic.name;
                    this.clinicData['description'] = clinic.description;
                }
            )
    }

    validateForm () {
        if (this.clinicData === undefined || this.clinicData === null) {
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
            <p><b>รายละเอียดแผนก:</b> ${this.clinicData['description']}</p>
            `;
    }

    updateClinic = () => {
        let clinicName = this.route.snapshot.params['clinicName'];
        this.dataService.updateData(CLINIC_ENDPOINT + '/' + clinicName, this.clinicData)
            .subscribe(
                (success) => {
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

