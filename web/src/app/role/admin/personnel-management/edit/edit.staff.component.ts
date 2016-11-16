import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../../shared/service/data.service';
import { STAFF_ENDPOINT } from '../../../../config/api.config';
@Component({
    selector: 'edit-staff',
    templateUrl: './edit.staff.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditStaffComponent implements OnInit {
    public formData;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

    ngOnInit () {
        this.formData = {};
        let hn = this.route.snapshot.params['HN'];
        this.dataService.getData(`${STAFF_ENDPOINT}/${hn}`)
            .subscribe(
                (success) => {
                    console.log(success);
                    this.formData = {
                        'HN': success['HN'],
                        'preName': success['preName'],
                        'name': success['name'],
                        'surname': success['surname'],
                        'personalID': success['personalID'],
                    }
                }
            )
    }
}