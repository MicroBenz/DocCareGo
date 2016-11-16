import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'edit-patient',
    templateUrl: './edit.patient.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditPatientComponent implements OnInit {
    public formData;

    ngOnInit () {
        this.formData = {};
    }
}