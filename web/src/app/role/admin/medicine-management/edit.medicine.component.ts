import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/service/data.service';
import { MEDICINE_ENDPOINT } from '../../../config/api.config';

@Component({
    selector: 'edit-medicine',
    templateUrl: './edit.medicine.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class EditMedicineComponent implements OnInit {
    public medicineData;

    constructor(private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit () {
        console.log('EDIT MEDICINE');
        this.medicineData = {
            name: '',
            description: ''
        }
        let medicineName = this.route.snapshot.params['medicineName'];
        this.dataService.getData(MEDICINE_ENDPOINT + '/' + medicineName)
            .subscribe(
                (medicine) => {
                    console.log('EDIT MED:', medicine);
                    this.medicineData['name'] = medicine.name;
                    this.medicineData['description'] = medicine.description;
                }
            )
    }
}