import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'edit-nurse',
    templateUrl: './edit.nurse.view.html',
    styles: [`
        .container {
            margin-top: 13px;
        }
        .button-wrapper {
            margin-top: 13px;
        }
    `]
})
export class EditNurseComponent implements OnInit {
    public formData;

    ngOnInit () {
        this.formData = {};
    }
}