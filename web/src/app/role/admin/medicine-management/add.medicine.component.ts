import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
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

    constructor (private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';
        this.medicineData = {
            name: '',
            description: ''
        }
    }

    validateForm () {
        if (this.medicineData === undefined || this.medicineData === null) {
            this.isShowInvalidate = true;
        }
        else if (this.medicineData['name'] === '' || this.medicineData['description'] === '') {
            this.isShowInvalidate = true;
        }
        else {
            this.isShowConfirm = true;
            this.decorateModalContent();
        }
     }

     private decorateModalContent () {
         this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำเพิ่มยา</h1>
            <p><b>ชื่อยา:</b> ${this.medicineData['name']}</p>
            <p><b>รายละเอียดยา:</b> ${this.medicineData['description']}</p>
        `;
     }

     addMedicine = () => {
         this.dataService.saveData(MEDICINE_ENDPOINT, this.medicineData)
            .subscribe(
                (success) => {
                    console.log('ADD NEW MEDICINE');
                    this.navigateToMedicineManagement();
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