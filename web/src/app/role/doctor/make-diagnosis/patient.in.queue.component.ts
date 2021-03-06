import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { DataService } from '../../../shared/service/data.service';
@Component({
    selector: 'patient-in-queue',
    templateUrl: './patient.in.queue.view.html',
    styles: [`
        .patient-list-view {
            height: 180px;
            overflow-y: scroll;
        }
        .is-active, .is-active:hover {
            background-color: #4ca2ff;
            color: #ffffff;
        }
    `]
})
export class PatientInQueueComponent implements OnInit {
    @Input('patientList') patientList = [];
    @Input('isLockSelect') isLockSelect = false;
    @Output('onSelectedPatient') onSelectedPatient = new EventEmitter();
    public selectedPatient;
    public selectedIndex;

    constructor(private dataService: DataService) {}

    ngOnInit () {
        this.selectedPatient = {};
        this.selectedIndex = -1;
    }

    selectPatient(i) {
        if (!this.isLockSelect) {
            this.selectedPatient = this.patientList[i];
            this.selectedIndex = i;
            this.onSelectedPatient.emit(i);
            this.isLockSelect = true;
        }
    }
}