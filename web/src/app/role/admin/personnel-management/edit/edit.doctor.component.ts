import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { DOCTOR_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-doctor',
    templateUrl: './edit.doctor.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditDoctorComponent implements OnInit {
    public formData;
    public confirmModalContent: string;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowSuccess: boolean;
    constructor(private title: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit () {
        this.formData = {};
        let hn = this.route.snapshot.params['HN'];
        this.dataService.getData(DOCTOR_ENDPOINT + '/' + hn)
            .subscribe(
                (doctor) => {
                    this.formData['HN'] = doctor.HN || '';
                    this.formData['personalID'] = doctor.personalID || '';
                    this.formData['preName'] = doctor.preName || '';
                    this.formData['name'] = doctor.name || '';
                    this.formData['surname'] = doctor.surname || '';
                    this.formData['clinic'] = doctor.clinic || '';
                }
            )

    }

    validateForm () {
        if (this.formData === undefined || this.formData === null) {
            this.isShowInvalidate = true;
        }
        else if (this.formData['HN'] === '' || this.formData['personalID'] === '' || this.formData['preName'] === ''
            || this.formData['name'] === '' || this.formData['surname'] === '' || this.formData['clinic'] === '') {
            this.isShowInvalidate = true;
        }
        else {
            this.isShowConfirm = true;
            this.decorateModalContent();
        }
     }

    decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำการแก้ไข</h1>
            <p><b>HN</b> ${this.formData['HN']}</p>
            <p><b>รหัสบัตรประชาชน</b> ${this.formData['personalID']}</p>
            <p><b>ชื่อแพทย์:</b> ${this.formData['name']}</p>
            <p><b>นามสกุล:</b> ${this.formData['surname']}</p>
            <p><b>คลินิก</b> ${this.formData['clinic']}</p>
        `;
    }

    saveDoctor = () => {
        let hn = this.route.snapshot.params['HN'];
        this.dataService.updateData(DOCTOR_ENDPOINT + '/' + hn, this.formData)
            .subscribe(
                (success) => {
                    this.isShowSuccess = true;
                }
            )
    }

    navigateToPersonalManagement = () => {
        this.router.navigateByUrl(`/admin/personnel-management`);
    }

    dismissModal = () => {
        this.isShowSuccess = false;
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }

}