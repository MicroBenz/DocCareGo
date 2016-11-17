import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'edit-pharmacist',
    templateUrl: './edit.pharmacist.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
    `]
})
export class EditPharmacistComponent implements OnInit {
    public formData;

    ngOnInit () {
        this.formData = {};
    }
}