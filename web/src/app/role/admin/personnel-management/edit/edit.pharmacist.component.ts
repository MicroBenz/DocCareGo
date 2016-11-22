import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { PHARMACIST_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-pharmacist',
    templateUrl: './edit.pharmacist.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class EditPharmacistComponent implements OnInit {
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
        console.log(hn);
        this.dataService.getData(PHARMACIST_ENDPOINT + '/' + hn)
            .subscribe(
                (pharmacist) => {
                    console.log('EDIT Pharmacist:', pharmacist);
                    this.formData['HN'] = pharmacist.HN || '';
                    this.formData['personalID'] = pharmacist.personalID||'';
                    this.formData['preName'] = pharmacist.preName||'';
                    this.formData['name'] = pharmacist.name||'';
                    this.formData['surname'] = pharmacist.surname||'';
                    
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
            <p><b>ชื่อเภสัชกร:</b> ${this.formData['name']}</p>
            <p><b>นามสกุล:</b> ${this.formData['surname']}</p>
        `;
    }

    savePharmacist = () => {
        console.log('save pharmacist');
        let hn = this.route.snapshot.params['HN'];
        this.dataService.updateData(PHARMACIST_ENDPOINT + '/' + hn, this.formData)
            .subscribe(
                (success) => {
                    console.log('SAVE PHARMACIST SUCCESS');
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