import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { PATIENT_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-patient',
    templateUrl: './edit.patient.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditPatientComponent implements OnInit {
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
        this.dataService.getData(PATIENT_ENDPOINT + '/' + hn)
            .subscribe(
                (patient) => {
                    console.log('EDIT Patient:', patient);
                    this.formData['HN'] = patient.HN || '';
                    this.formData['personalID'] = patient.personalID || '';
                    this.formData['preName'] = patient.preName || '';
                    this.formData['name'] = patient.name || '';
                    this.formData['surname'] = patient.surname || '';
                    this.formData['houseNumber'] = patient.houseNumber || '';
                    this.formData['road'] = patient.road || '';
                    this.formData['soi'] = patient.soi || '';
                    this.formData['subdistrict'] = patient.subdistrict || '';
                    this.formData['district'] = patient.district || '';
                    this.formData['province'] = patient.province || '';
                    this.formData['zipCode'] = patient.zipCode || '';
                    this.formData['country'] = patient.country || '';
                    this.formData['tel'] = patient.tel || '';
                    this.formData['noMedicines'] = patient.noMedicines || '';
                }
            )
    }

    validateForm () {
        if (this.formData === undefined || this.formData === null) {
            this.isShowInvalidate = true;
        }
        else if (this.formData['HN'] === '' || this.formData['personalID'] === '' || this.formData['preName'] === ''
            || this.formData['name'] === '' || this.formData['surname'] === '' || this.formData['houseNumber'] === ''
            || this.formData['road'] === '' || this.formData['soi'] === '' || this.formData['subdistrict'] === ''
            || this.formData['district'] === '' || this.formData['province'] === '' || this.formData['zipCode'] === ''
            || this.formData['country'] === '' || this.formData['tel'] === '') {

            this.isShowInvalidate = true;
        }
        else {
            
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
            <p><b>บ้านเลขที่:</b> ${this.formData['houseNumber']}</p>
            <p><b>ถนน:</b> ${this.formData['road']}</p>
            <p><b>ซอย:</b> ${this.formData['soi']}</p>
            <p><b>แขวง:</b> ${this.formData['subdistrict']}</p>
            <p><b>เขต:</b> ${this.formData['district']}</p>
            <p><b>จังหวัด:</b> ${this.formData['province']}</p>
            <p><b>ประเทศ:</b> ${this.formData['country']}</p>
            <p><b>เบอร์โทรศัพท์เคลื่อนที่:</b> ${this.formData['tel']}</p>
            <p><b>ยาที่แพ้: </b>${this.formData['noMedicines']}</p>
        `;
        this.isShowConfirm = true;
    }
    savePatient = () => {
        console.log('save patient');
        let hn = this.route.snapshot.params['HN'];
        this.dataService.updateData(PATIENT_ENDPOINT + '/' + hn, this.formData)
            .subscribe(
                (success) => {
                    console.log('SAVE PATIENT SUCCESS');
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