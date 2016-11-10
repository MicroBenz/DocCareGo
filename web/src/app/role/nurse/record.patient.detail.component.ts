import { Component, Input } from '@angular/core';

@Component({
    selector: 'record-patient-detail',
    templateUrl: './record.patient.detail.view.html',
    styleUrls: ['record.patient.detail.style.css']
})
export class RecordPatientDetailComponent {
    @Input('patient') patient;
}