import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ADD_PERSONNEL_TITLE } from '../../../config/title.config';
import { PATIENT_ENDPOINT, DOCTOR_ENDPOINT, NURSE_ENDPOINT, STAFF_ENDPOINT, PHARMACIST_ENDPOINT } from '../../../config/api.config';
import { DataService } from '../../../shared/service/data.service';
@Component({
    selector: 'add-personnel',
    templateUrl: './add.personnel.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .role-select-wrapper {
            margin-top: 10px;
            margin-bottom: 15px;
        }
    `]
})
export class AddPersonnelComponent implements OnInit {
    public selectedRole: string;
    public isSelected: boolean;
    public formData: Object;
    public confirmModalContent: string;
    public isShowConfirm: boolean;
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;
    private roleMapping = {
        patient: 'ผู้ป่วย',
        doctor: 'แพทย์',
        pharmacist: 'เภสัชกร',
        staff: 'เจ้าหน้าที่',
        nurse: 'พยาบาล'
    }

    constructor(private title: Title, private dataService: DataService, private router: Router) {}

    ngOnInit () {
        // this.selectedRole = '';
        // this.isSelected = false;
        this.title.setTitle(ADD_PERSONNEL_TITLE);
        this.selectedRole = '';
        this.isSelected = false;
        this.formData = {};
        this.confirmModalContent = '';
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }

    addNewPersonnel () {
        if (this.validateForm()) {
            this.decorateModalContent();
            this.isShowConfirm = true;            
        }
        else {
            this.isShowInvalidate = true;
        }
    }

    navigateToPersonnelManagement = () => {
        this.router.navigateByUrl('/admin/personnel-management');
    }

    dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }

    private validateForm () {
        if (this.formData['HN'] === undefined || this.formData['HN'] === null || this.formData['HN'] === '') {
            return false;
        }
        if (this.formData['personalID'] === undefined || this.formData['personalID'] === null || this.formData['personalID'] === '') {
            return false;
        }
        if (this.formData['preName'] === undefined || this.formData['preName'] === null || this.formData['preName'] === '') {
            return false;
        }
        if (this.formData['name'] === undefined || this.formData['name'] === null || this.formData['name'] === '') {
            return false;
        }
        if (this.formData['surname'] === undefined || this.formData['surname'] === null || this.formData['surname'] === '') {
            return false;
        }
        
        if (this.selectedRole === 'doctor') {
            if (this.formData['clinic'] === undefined || this.formData['clinic'] === null || this.formData['clinic'] === '') {
                return false;
            }
        }
        return true;
    }

    private decorateModalContent () {
        let headerTemplate = `<h1 class="title">ตรวจสอบข้อมูล${this.roleMapping[this.selectedRole]}ใหม่</h1>`;
        let hnAndPersonalID = `<p><b>HN: </b>${this.formData['HN']} <b>รหัสบัตรประชาชน: </b>${this.formData['personalID']}</p>`;
        let name = `
            <p><b>ชื่อ-นามสกุล</b>: ${this.formData['preName']}${this.formData['name']} ${this.formData['surname']}</p>
        `
        if (this.selectedRole === 'doctor') {
            let clinic = `<p><b>คลินิก: </b>${this.formData['clinic']}</p>`;
            this.confirmModalContent = headerTemplate + hnAndPersonalID + name + clinic;
        }
        else {
            this.confirmModalContent = headerTemplate + hnAndPersonalID + name;            
        }
    }

    dataServiceFunction (role, formData) {
        let endPoint = '';
        switch (role) {
            case 'patient':
                endPoint = PATIENT_ENDPOINT;
                break;
            case 'doctor':
                endPoint = DOCTOR_ENDPOINT;
                break;
            case 'nurse':
                endPoint = NURSE_ENDPOINT;
                break;
            case 'staff':
                endPoint = STAFF_ENDPOINT;
                break;
            case 'pharmacist':
                endPoint = PHARMACIST_ENDPOINT;
        }
        return () => {         
            return this.dataService.saveData(endPoint, formData)
                .subscribe(
                    (success) => {
                        this.navigateToPersonnelManagement();
                    },
                    (error) => {
                        console.error(error);
                    }
                )
        }
    }
}