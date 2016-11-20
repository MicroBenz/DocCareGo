import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../../shared/service/data.service';
@Component({
    selector: 'patient-in-queue',
    templateUrl: './patient.in.queue.view.html',
    styles: [`
        .patient-list-view {
            height: 180px;
            overflow-y: scroll;
        }
    `]
})
export class PatientInQueueComponent implements OnInit {
    @Input('patientList') patientList = [];
    public selectedPatient;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.selectedPatient = {};
    }

    selectPatient(i) {
        this.selectedPatient = this.patientList[i];
    }
}