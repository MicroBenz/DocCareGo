import { Component, Input } from '@angular/core';
@Component({
    selector: 'nurse-form',
    templateUrl: './nurse.form.view.html'
})
export class NurseFormComponent {
    @Input('formData') formData;
}