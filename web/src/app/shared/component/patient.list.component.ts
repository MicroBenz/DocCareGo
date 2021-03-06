import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'patient-list',
    templateUrl: './patient.list.view.html',
    styles: [`
        .active {
            background-color: #4ca2ff;
            color: #ffffff;
        }
        .patient-item {
            border-bottom: 1px solid #c8c7cc;
            margin-left: -20px;
            padding: 12px 20px 12px 20px;
        }
        .patient-item .time-circle {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 24px;
            color: #ffffff;
            background-color: #ff3860;
            line-height: 45px;
            text-align: center;
        }
        .patient-item .time-circle i.fa{
            line-height: 45px;
        }
        .patient-info {
            padding-left: 0px;
            padding-right: 0px;
        }
        .patient-info .patient-name {
            font-size: 19px;
        }
        .patient-info .patient-clinic {
            font-weight: 200;
        }
        .patient-list {
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 15px;
        }
    `]
})
export class PatientListComponent {
    @Output('patientEmitter') patientEmitter = new EventEmitter<any>();
    @Input('patientList') patientList;

    private selectedIndex = -1;    
    onSelectPatient (idx) {
        this.selectedIndex = idx;
        this.patientEmitter.emit(idx);
    }
}