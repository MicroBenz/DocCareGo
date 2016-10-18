import { Component, Input } from '@angular/core';
@Component({
    selector: 'patient-prescription',
    templateUrl: './patient.prescription.view.html'
})
export class PatientPrescriptionComponent {
    @Input('patient') patient;
    @Input('prescription') prescription;
}