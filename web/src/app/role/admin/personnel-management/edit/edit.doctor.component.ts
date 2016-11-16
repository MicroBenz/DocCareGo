import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
@Component({
    selector: 'edit-doctor',
    templateUrl: './edit.doctor.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditDoctorComponent implements OnInit {
    public formData;

    constructor(private title: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit () {
        this.formData = {};
        let hn = this.route.snapshot.params['HN'];
        console.log(hn);
    }
}