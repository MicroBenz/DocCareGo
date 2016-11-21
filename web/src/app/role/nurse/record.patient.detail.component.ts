import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../shared/service/data.service';
import { PATIENT_RECORD_ENDPOINT } from '../../config/api.config';

@Component({
    selector: 'record-patient-detail',
    templateUrl: './record.patient.detail.view.html',
    styles: [`
        .input-row-wrapper {
            margin-bottom: 15px;
        }
        .input-row-wrapper .input-wrapper {
            width: 48%;
            display: inline-block;
        }
        .left-side {
            margin-right: 2%;
        }
        .input-wrapper .systolic, .input-wrapper .diastolic{
            width: 46%;
        }
        .patient-info {
            margin-bottom: 15px;
        }
        .weight-wrapper {
            width: 28% !important;
        }
        .height-wrapper {
            width: 28% !important;
            margin-right: 2%;
        }
        .temp-wrapper {
            width: 37% !important;
        }
    `]
})
export class RecordPatientDetailComponent implements OnInit {
    @Input('patient') patient;
    public patientRecord;
    public isShowConfirm: boolean;
    public isShowInvalidate: boolean;
    public confirmModalContent: string;

    constructor (private dataService: DataService) {}

    ngOnInit () {
        this.isShowConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';
        this.patientRecord = {};
    }

    private validateForm() {
        if (this.patientRecord['weight'] === undefined || this.patientRecord['weight'] === null || this.patientRecord['weight'] === '') {
            return false;
        }
        if (this.patientRecord['height'] === undefined || this.patientRecord['height'] === null || this.patientRecord['height'] === '') {
            return false;
        }
        if (this.patientRecord['temperature'] === undefined || this.patientRecord['temperature'] === null || this.patientRecord['temperature'] === '') {
            return false;
        }
        if (this.patientRecord['heartRate'] === undefined || this.patientRecord['heartRate'] === null || this.patientRecord['heartRate'] === '') {
            return false;
        }
        if (this.patientRecord['systolic'] === undefined || this.patientRecord['systolic'] === null || this.patientRecord['systolic'] === '') {
            return false;
        }
        if (this.patientRecord['diastolic'] === undefined || this.patientRecord['diastolic'] === null || this.patientRecord['diastolic'] === '') {
            return false;
        }
        else {
            return true;
        }
    }

    addNewPatientRecord() {
        if(this.validateForm()) {
            this.decorateModalContent();
            this.isShowConfirm = true;
        }
        else {
            this.isShowInvalidate = true;
        }
    }

    private decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนบันทึกข้อมูล</h1>
            <p><b>น้ำหนัก:</b> ${this.patientRecord['weight']}</p>
            <p><b>ส่วนสูง:</b> ${this.patientRecord['height']}</p>
            <p><b>อุณหภูมิ:</b> ${this.patientRecord['temperature']}</p>
            <p><b>ความดันโลหิต (บีบ/คลาย):</b> ${this.patientRecord['systolic']}/${this.patientRecord['diastolic']} </p>
            <p><b>อัตราการเต้นของหัวใจ:</b> ${this.patientRecord['heartRate']}</p>
        `;
    }

    recordPatientDetailDataService = () => {
        this.patientRecord['appointment'] = this.patient['id'];
        console.log(this.patientRecord);
        
        this.dataService.saveData(PATIENT_RECORD_ENDPOINT, this.patientRecord)
            .subscribe(
                (success) => {
                    console.log('RECORD PATIENT DETAIL');
                    this.dismissModal();
                    location.reload();
                }
            )
    }

    dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowInvalidate = false;
    }
}