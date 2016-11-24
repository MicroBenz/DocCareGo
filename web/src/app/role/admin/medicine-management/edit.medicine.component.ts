import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'edit-medicine',
    templateUrl: './edit.medicine.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditMedicineComponent implements OnInit {
    public medicineData;
    public confirmModalContent: string;
    public isShowConfirm: boolean;    
    public isShowCancelConfirm: boolean;
    public isShowInvalidate: boolean;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.isShowConfirm = false;
        this.isShowCancelConfirm = false;
        this.isShowInvalidate = false;
        this.confirmModalContent = '';
        this.medicineData = {
            name: '',
            description: ''
        }
        let medicineName = this.route.snapshot.params['medicineName'];
        this.dataService.getData(MEDICINE_ENDPOINT + '/' + medicineName)
            .subscribe(
                (medicine) => {
                    this.medicineData['name'] = medicine.name;
                    this.medicineData['description'] = medicine.description;
                }
            )
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

    decorateModalContent () {
        this.confirmModalContent = `
            <h1 class="title">ตรวจสอบข้อมูลก่อนทำการแก้ไข</h1>
            <p><b>ชื่อยา:</b> ${this.medicineData['name']}</p>
            <p><b>รายละเอียดยา:</b> ${this.medicineData['description']}</p>
        `;
    }

    saveMedicine = () => {
        let medicineName = this.route.snapshot.params['medicineName'];
        this.dataService.updateData(MEDICINE_ENDPOINT + '/' + medicineName, this.medicineData)
            .subscribe(
                (success) => {
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