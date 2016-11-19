import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { NURSE_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-nurse',
    templateUrl: './edit.nurse.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditNurseComponent implements OnInit {
    public formData;
    public confirmModalContent: string;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;

    constructor(private title: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit () {
        this.formData = {};
        let hn = this.route.snapshot.params['HN'];
        console.log(hn);
        this.dataService.getData(NURSE_ENDPOINT + '/' + hn)
            .subscribe(
                (nurse) => {
                    console.log('EDIT Doctor:', nurse);
                    this.formData['HN'] = nurse.HN;
                    this.formData['personalID'] = nurse.personalID;
                    this.formData['preName'] = nurse.preName;
                    this.formData['name'] = nurse.name;
                    this.formData['surname'] = nurse.surname;
                    
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
            <p><b>ชื่อพยาบาล:</b> ${this.formData['name']}</p>
            <p><b>นามสกุล:</b> ${this.formData['surname']}</p>
        `;
    }

    saveNurse = () => {
        console.log('save nurse');
        let hn = this.route.snapshot.params['HN'];
        this.dataService.updateData(NURSE_ENDPOINT + '/' + hn, this.formData)
            .subscribe(
                (success) => {
                    console.log('SAVE NURSE SUCCESS');
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
