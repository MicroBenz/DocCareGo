import { Component, Input } from '@angular/core';

@Component({
    selector: 'record-patient-detail',
    templateUrl: './record.patient.detail.view.html',
    styles: [`
        .input-row-wrapper {
            margin-bottom: 15px;
        }
        .input-row-wrapper .input-wrapper {
            width: 48%;
            display: inline-block;
        }
        .left-side {
            margin-right: 2%;
        }
        .input-wrapper .systolic, .input-wrapper .diastolic{
            width: 46%;
        }
        .patient-info {
            margin-bottom: 15px;
        }
        .weight-wrapper {
            width: 28% !important;
        }
        .height-wrapper {
            width: 28% !important;
            margin-right: 2%;
        }
        .temp-wrapper {
            width: 37% !important;
        }
    `]
})
export class RecordPatientDetailComponent {
    @Input('patient') patient;
}