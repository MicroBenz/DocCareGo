import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DataService } from '../../../shared/service/data.service';
import { ADD_MEDICINE_TITLE } from '../../../config/title.config'
import { MEDICINE_ENDPOINT } from '../../../config/api.config';
@Component({
    selector: 'add-medicine',
    templateUrl: './add.medicine.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class AddMedicineComponent implements OnInit {
    public medicineData;
    public confirmModalContent: string;
    public isShowConfirm: boolean;
    public isShowInvalidate: boolean;
    public isShowCancelConfirm: boolean;

    constructor (private title: Title, private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.title.setTitle(ADD_MEDICINE_TITLE);
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';
        this.medicineData = {
            name: '',
            description: ''
        }
    }

    private validateForm () {
        if (this.medicineData === undefined || this.medicineData === null) {
            return false;
        }
        if (this.medicineData['name'] === undefined || this.medicineData['name'] === null || this.medicineData['name'] === '') {
            return false;
        }
        if (this.medicineData['description'] === undefined || this.medicineData['description'] === null || this.medicineData['description'] === '') {
            return false;
        }
        else {
            return true;
        }
     }

     addNewMedicine () {
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
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำเพิ่มยา</h1>
            <p><b>ชื่อยา:</b> ${this.medicineData['name']}</p>
            <p><b>รายละเอียดยา:</b> ${this.medicineData['description']}</p>
        `;
     }

     addMedicineDataService = () => {
         this.dataService.saveData(MEDICINE_ENDPOINT, this.medicineData)
            .subscribe(
                (success) => {
                    console.log('ADD NEW MEDICINE');
                    this.navigateToMedicineManagement();
                },
                (error) => {
                        console.error(error);
                }
            )
     }

     navigateToMedicineManagement = () => {
        this.router.navigateByUrl('/admin/medicine-management');
    }
    
     dismissModal = () => {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
    }
}