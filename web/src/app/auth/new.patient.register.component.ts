import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NEW_PATIENT_REGISTER_TITLE } from '../config/title.config';
@Component({
    selector: 'new-patient-register',
    templateUrl: './new.patient.register.view.html',
    styles: [`
        :host {
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            background-image: url('assets/img/login_bg3.jpg');
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
        #register-view {
            width: 100%;
        }
        #register-box {
            width: 80%;
            margin: auto;
            padding: 25px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    `]
})
export class NewPatientRegisterComponent implements OnInit {
    public formData;
    constructor(private title: Title, private router: Router) {}

    ngOnInit () {
        this.formData = {};
        this.title.setTitle(NEW_PATIENT_REGISTER_TITLE);
    }
}