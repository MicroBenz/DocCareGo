import { Component, Input } from '@angular/core';
@Component({
    selector: 'patient-form',
    templateUrl: './patient.form.view.html'
})
export class PatientFormComponent {
    @Input('formData') formData;
    @Input('isNeedHN') isNeedHN = true;
}