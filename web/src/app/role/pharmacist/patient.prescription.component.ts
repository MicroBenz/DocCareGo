import { Component, Input } from '@angular/core';
@Component({
    selector: 'patient-prescription',
    templateUrl: './patient.prescription.view.html',
    styles: [`

    `]
})
export class PatientPrescriptionComponent {
    @Input('patient') patient;
    @Input('prescription') prescription;
    @Input('numberOfMedicines') numberOfMedicines;
}