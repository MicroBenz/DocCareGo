import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../../shared/service/data.service';
import { STAFF_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-staff',
    templateUrl: './edit.staff.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditStaffComponent implements OnInit {
    public formData;
    public confirmModalContent: string;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;


    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.formData = {};
        let hn = this.route.snapshot.params['HN'];
        console.log(hn);
        this.dataService.getData(STAFF_ENDPOINT + '/' + hn)
            .subscribe(
                (staff) => {
                    console.log('EDIT Pharmacist:', staff);
                    this.formData['HN'] = staff.HN;
                    this.formData['personalID'] = staff.personalID;
                    this.formData['preName'] = staff.preName;
                    this.formData['name'] = staff.name;
                    this.formData['surname'] = staff.surname;
                    
                }
            )
    }
    validateForm () {
        if (this.formData === undefined || this.formData === null) {
            this.isShowInvalidate = true;
        }
        else if (this.formData['HN'] === '' || this.formData['personalID'] === '' || this.formData['preName'] === ''
            || this.formData['name'] === '' || this.formData['surname'] === '') {
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
            <p><b>ชื่อเจ้าหน้าที่:</b> ${this.formData['name']}</p>
            <p><b>นามสกุล:</b> ${this.formData['surname']}</p>
        `;
    }

    saveStaff = () => {
        console.log('save staff');
        let hn = this.route.snapshot.params['HN'];
        this.dataService.updateData(STAFF_ENDPOINT + '/' + hn, this.formData)
            .subscribe(
                (success) => {
                    console.log('SAVE STAFF SUCCESS');
                    this.navigateToPersonalManagement();
                }
            )
    }

    navigateToPersonalManagement = () => {
        this.router.navigateByUrl(`/admin/personnel-management`);
    }

    dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }

}