import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'add-medicine',
    templateUrl: './add.medicine.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class AddMedicineComponent implements OnInit {
    public medicineData;

    ngOnInit () {
        this.medicineData = {
            name: '',
            description: ''
        }
    }
}