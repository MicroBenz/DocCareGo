import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../../../../shared/service/data.service';
import { CLINIC_ENDPOINT } from '../../../../config/api.config';

@Component({
    selector: 'doctor-form',
    templateUrl: './doctor.form.view.html'
})
export class DoctorFormComponent implements OnInit {
    @Input('formData') formData;
    public clinicList;
    
    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.clinicList = [];
        this.dataService.getData(CLINIC_ENDPOINT)
            .subscribe(
                (success: Array<any>) => {
                    console.log(success);
                    this.clinicList = success.map(
                        (item) => {
                            return item['name']
                        }
                    )
                    console.log(this.clinicList);
                }
            )
    }
}